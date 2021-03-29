import { Component, OnInit } from '@angular/core';
import { constructor } from 'q';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { storage } from 'firebase';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-editar-materiales',
  templateUrl: './editar-materiales.component.html',
  styleUrls: ['./editar-materiales.component.css']
})
export class EditarMaterialComponent implements OnInit {
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
  private itemDoc: AngularFirestoreDocument<Material>;
  itemRecibido: Observable<Material>;
  item: Material = {
    codigo: '',
    nombreBusqueda: '',
    descripcion: '',
    key: '',
    pais: '',
    usuarioAlta: '',
    fechaAlta:0,
    fechaEdicion: 0,
    estado: 0,
    descripcionPT: ''

    };

  constructor(private sharedService: SharedService, public back: BackendService,
              private route: ActivatedRoute, private afs: AngularFirestore) { }

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

    this.itemDoc = this.afs.doc<Material>('material/' + idRecibido);
    this.itemDoc.valueChanges().subscribe(data => {
      console.log(data);
      this.item = data;
      this.actualizarItem(this.item, idRecibido);
    });


    // console.log(this.item.nombre);

  }



  crearItem() {
    this.item.pais = 'MX';

    this.item.fechaEdicion = new Date().getTime();
    this.item.nombreBusqueda = this.sharedService.corregirCaracteres(this.item.descripcion);
    this.itemDoc.update(this.item);
    this.submitted = true;

    window.scrollTo(0, 0);
  }
  cancel() {
    this.sharedService.cancelar();
  }


  actualizarItem(items, idRecibido) {
    console.log('hola' + idRecibido);



    // console.log(idRecibido);
    // item.pais = 'MX';

    // // this.item.fechaEdicion = new Date().getTime();
    
    

    // tslint:disable-next-line:prefer-const

    // let m: Material = {
    //   codigo: '',
    // nombreBusqueda: '',
    // descripcion: '',
    // key: '',
    // pais: '',
    // usuarioAlta: '',
    // fechaAlta: 0,
    // fechaEdicion: 0,
    // estado: 0,
    //   };

    // m.codigo = items.codigo;

    //   m.descripcion = items.descripcion;
    //   m.key = '';
    //   m.pais = 'MX';
    //   m.usuarioAlta = '';
    //   m.fechaAlta = items.fechaAlta;
    //   m.fechaEdicion = items.fechaEdicion;
    //   m.estado = 0;
    items.nombreBusqueda = this.sharedService.corregirCaracteres(items.descripcion);

    console.log(items);
    this.itemDoc.update(items);
    
    // this.submitted = true;
  }
}
