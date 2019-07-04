import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  mensajeErrorImg = '';
  claseCargaImg = '';
  porcentajeCargaImg: any;
  submitted = false;
  imgError = false;
  selectedFile = null;
  estadoCargaImg = false;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  key = 'CsiHCHA3p37pEKX5cFcz';
  private itemsCollection: AngularFirestoreCollection<Dashboard>;
  items: Observable<Dashboard[]>;


  item: Dashboard = {
    ventas: 0,
    mensaje: '',
    video: '',
    duracionVideo: 0,
    tempHoy: ''
  }

  constructor(private sharedService: SharedService, private afs: AngularFirestore, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.getDashboardInfo();
  }


  getDashboardInfo(){


    //this.itemsCollection = this.afs.collection<Dashboard>('');
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.items = this.afs.collectionGroup<Dashboard>('dashboard', )
      .valueChanges();
    this.items.subscribe(elements=>{
        
        this.item.ventas = elements[0].ventas;
        this.item.mensaje = elements[0].mensaje;
      this.item.duracionVideo = elements[0].duracionVideo;
      });
  }

  crearItem() {
    
    //this.item.usuarioAlta = keyUser;
    const itemDoc = this.afs.doc<Dashboard>('dashboard/CsiHCHA3p37pEKX5cFcz');
    itemDoc.update(this.item);
    
  }
  cancel() {
    this.sharedService.cancelar();
  }

  /*Carga de imagenes */
  getFile(event) {
    this.imgError = false;


    this.selectedFile = event.target.files[0];
    console.log(event.target.files[0].type);
    // this.uploadFile();
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].type === 'video/mp4' ) {
        console.log('Video válido');
        if (event.target.files[0].size < 2000 * 2000) {// Checking height * width}
          console.log('tamaño válida');
          // this.selectedFile.push(event.target.id = { tevent.target.files[0]});
          // console.log(this.selectedFile);
          if (event.target.files[0].size < 2000000) {//
            console.log('peso válido');
            this.uploadFile(event.target.id);
          } else {
            // Peso inválido

            this.mensajeErrorImg = 'Video demasiado grande. Debe pesar menos de ';
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
    const filePath = 'video_dasboard/' + file.name;
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
            this.item.video = url;
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
