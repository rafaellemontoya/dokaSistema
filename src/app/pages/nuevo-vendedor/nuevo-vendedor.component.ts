import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-nuevo-vendedor',
  templateUrl: './nuevo-vendedor.component.html',
  styleUrls: ['./nuevo-vendedor.component.css']
})
export class NuevoVendedorComponent implements OnInit {
  mensajeErrorImg = '';
  claseCargaImg = '';
  porcentajeCargaImg: any ;
  submitted = false;
  imgError = false;
  selectedFile = null;
  estadoCargaImg = false;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;


  item: Vendedores = {

  nombre: '',
  cantidad: 0,
  imagen: '',
  valorEstado: 0

  };

  constructor(private sharedService: SharedService, private afs: AngularFirestore, private storage: AngularFireStorage) { }

  ngOnInit() {
  }



  crearItem() {
    
    switch (String(this.item.valorEstado)) {

      case '0':
        this.item.imagen = 'https://firebasestorage.googleapis.com/v0/b/tudoka-1deed.appspot.com/o/cobrometro%2Farriba.png?alt=media&token=e7805bb6-4aaf-49da-9293-8e18a0be386b';
        break;
    case '1':
      this.item.imagen = 'https://firebasestorage.googleapis.com/v0/b/tudoka-1deed.appspot.com/o/cobrometro%2Fabajo.png?alt=media&token=a2d85cb4-723b-4980-8bca-62f588f14769';
      break;

    case '2':
      this.item.imagen = 'https://firebasestorage.googleapis.com/v0/b/tudoka-1deed.appspot.com/o/cobrometro%2Fcumpliendo.png?alt=media&token=8ff4a64d-e629-42ac-9552-0920067f1c7d';
      break;

    case '3':
      this.item.imagen = 'https://firebasestorage.googleapis.com/v0/b/tudoka-1deed.appspot.com/o/cobrometro%2Farriba.png?alt=media&token=e7805bb6-4aaf-49da-9293-8e18a0be386b';
      break;
      default:
        this.item.imagen = 'hola';
        break;
    }
    console.log(this.item);
    const itemCollection = this.afs.collection<Vendedores>('vendedores');
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
            this.item.imagen = url;
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
