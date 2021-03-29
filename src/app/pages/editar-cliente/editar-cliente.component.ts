import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { SharedService } from 'src/app/services/shared.service';
import { finalize } from 'rxjs/operators';
import { flatMap, map } from 'rxjs/operators';
import { BackendService } from 'src/app/services/backend.service';

export interface ProyectoId extends Proyecto{ id: string; }

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  mensajeErrorImg = '';
  claseCargaImg = '';
  porcentajeCargaImg: any ;
  submitted = false;
  imgError = false;
  selectedFile = null;
  estadoCargaImg = false;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  private proyectosCollection: AngularFirestoreCollection<Proyecto>;
  proyectos: Observable<Proyecto[]>;
  nombreAnterior = '';

  idRecibido = '';
  private itemDoc: AngularFirestoreDocument<Cliente>;
  itemRecibido: Observable<Cliente>;
  item: Cliente = {
    nombre: '',
    nombreBusqueda: '',
    numero: '',
    key: '',
    pais: '',
    usuarioAlta: '',
    fechaAlta: 0,
    estado: 0,
    logo: '',
    fechaEdicion: 0,

    };

  constructor(private sharedService: SharedService,
              // tslint:disable-next-line:max-line-length
              private route: ActivatedRoute, private afs: AngularFirestore, private storage: AngularFireStorage, public back: BackendService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.route.params
    .subscribe( parametros => {
    this.idRecibido = parametros.id;
    console.log(parametros.id);
    this.obtenerInformacion(this.idRecibido);
   });
 }

  obtenerInformacion(idRecibido) {
    // this.afs.collection('clients', ref => ref.where('key', '==', 'large'));
    this.itemDoc = this.afs.doc<Cliente>('clients/' + idRecibido);
    this.itemDoc.valueChanges().subscribe(data => {
      console.log(data);
      this.item = data;
      this.nombreAnterior = data.nombre;
    });


    // console.log(this.item.nombre);

  }


  crearItem() {
    
    this.item.fechaEdicion = new Date().getTime();
    this.item.nombreBusqueda = this.sharedService.corregirCaracteres(this.item.nombre);

    // this.proyectosCollection = this.afs.collection<Proyecto>('projects', ref => ref.where('cliente', '==', this.nombreAnterior));
    
    // this.proyectos = this.proyectosCollection.valueChanges();
    // this.proyectos.subscribe(data => {
    //   console.log(data);
    // });

    this.proyectosCollection = this.afs.collection<Proyecto>('projects', ref => ref.where('cliente', '==', this.nombreAnterior));
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.proyectos = this.proyectosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Proyecto;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );


    this.proyectos.forEach(data => {
      console.log(data);
      this.updateProyecto(data);
    });
    console.log(this.proyectos);
    this.itemDoc.update(this.item);
    this.submitted = true;

    window.scrollTo(0, 0);
  }
  updateProyecto(proyectos: Proyecto[]){
    let proyectoDoc: AngularFirestoreDocument<Proyecto>;

    proyectos.forEach(data => {
      console.log(data['id']);
      proyectoDoc = this.afs.doc<Proyecto>('projects/' + data['id'])
      proyectoDoc.update({cliente: this.item.nombre, pais: this.item.pais });
    });

  }
  cancel() {
    this.sharedService.cancelar();
  }

  /*Carga de imagenes */
  getFile(event) {
    this.imgError = false;


    this.selectedFile = event.target.files[0];
    console.log(event.target.id);
    // this.uploadFile();
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].type === 'image/jpeg' ||
        event.target.files[0].type === 'image/png' ||
        event.target.files[0].type === 'image/jpg') {
        console.log('Imagen válida');
        if (event.target.files[0].size < 200 * 200) {// Checking height * width}
          console.log('tamaño válida');
          // this.selectedFile.push(event.target.id = { tevent.target.files[0]});
          // console.log(this.selectedFile);
          if (event.target.files[0].size < 2000000) {//
            console.log('peso válido');
            this.uploadFile(event.target.id);
          } else {
            // Peso inválido

            this.mensajeErrorImg = 'Imagen demasiado grande. Debe pesar menos de ';
            this.imgError = true;

            console.log('peso inválido');
          }
        } else {
          // Tamaño inválido

          this.mensajeErrorImg = 'Tamaño inválido. Debe medir 200 px de alto por 200 px de ancho.';
          this.imgError = true;

          console.log('tamaño inválido');
        }
      } else {
        // No es imagen

        this.mensajeErrorImg = 'Formato no válido, debe ser una imagen en .jpg o .png';
        this.imgError = true;

        console.log('No imagen');
        // alert('Error');
        // event.srcElement.value = '';

      }
    }
  }
  uploadFile(nombreImagen: string) {

    // Activo proceso de carga

    this.estadoCargaImg = true;
    this.claseCargaImg = 'progress-bar progress-bar-primary progress-bar-striped';

    const file = this.selectedFile;
    const filePath = 'clients/' + file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    this.uploadPercent.subscribe(n => {

      this.porcentajeCargaImg = n;

      console.log(n);
    });
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(
          url => {
            this.item.logo = url;
            this.claseCargaImg = 'progress-bar progress-bar-success';
          }
        );
      }
      )
    )
      .subscribe(
        x => console.log(fileRef.getDownloadURL));
  }

}
