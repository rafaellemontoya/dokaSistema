import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-editar-vendedor',
  templateUrl: './editar-vendedor.component.html',
  styleUrls: ['./editar-vendedor.component.css']
})
export class EditarVendedorComponent implements OnInit {

  mensajeErrorImg = '';
  claseCargaImg = '';
  porcentajeCargaImg: any ;
  submitted = false;
  imgError = false;
  selectedFile = null;
  estadoCargaImg = false;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  idRecibido = '';
  private itemDoc: AngularFirestoreDocument<Vendedores>;
  itemRecibido: Observable<Vendedores>;

  item: Vendedores = {
    id: '',
    nombre: '',
    cantidad: 0,
    imagen: '',
    valorEstado: 0

  }

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private sharedService: SharedService, private afs: AngularFirestore, private storage: AngularFireStorage) { }

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
    this.itemDoc = this.afs.doc<Vendedores>('vendedores/' + idRecibido);
    this.itemDoc.valueChanges().subscribe(data => {
      console.log(data);
      this.item = data;
    });


    // console.log(this.item.nombre);

  }

  crearItem(){
    

    const itemCollection = this.afs.collection<Vendedores>('vendedores');
    this.itemDoc.update(this.item);
    this.submitted = true;

    window.scrollTo(0, 0);
  }
  cancel() {
    this.sharedService.cancelar();
  }

  /*Carga de imagenes */




}

