import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css']
})
export class NuevoClienteComponent implements OnInit {
  mensajeErrorImg = '';
  claseCargaImg = '';
  porcentajeCargaImg: any ;
  submitted = false;
  imgError = false;
  selectedFile = null;
  estadoCargaImg = false;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;


  item: Cliente = {
  nombre: '',
  nombreBusqueda: '',
  numero: '',
  key: '',
  pais: 'MX',
  usuarioAlta: '',
  fechaAlta: 0,
  estado: 0,
  logo: '',
  fechaEdicion: 0,
  }

  constructor(private sharedService: SharedService, private afs: AngularFirestore, private storage: AngularFireStorage,
              public back: BackendService) { }

  ngOnInit() {
  }



  crearItem() {
    //this.item.usuarioAlta = keyUser;
    this.item.fechaAlta = new Date().getTime();
    this.item.nombreBusqueda = this.sharedService.corregirCaracteres(this.item.nombre);

    const itemCollection = this.afs.collection<Cliente>('clients');
    itemCollection.add(this.item);
    this.submitted = true;
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
