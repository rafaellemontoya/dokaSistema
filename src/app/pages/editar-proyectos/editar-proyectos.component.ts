import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-editar-proyectos',
  templateUrl: './editar-proyectos.component.html',
  styleUrls: ['./editar-proyectos.component.css']
})
export class EditarProyectosComponent implements OnInit {

  clienteSeleccionado: Cliente = {
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
    };

  mensajeErrorImg = '';
  claseCargaImg = '';
  porcentajeCargaImg: any ;
  submitted = false;
  imgError = false;
  selectedFile = null;
  estadoCargaImg = false;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  private itemsCollection: AngularFirestoreCollection<Cliente>;
  items: Observable<Cliente[]>;

  idRecibido = '';
  private itemDoc: AngularFirestoreDocument<Proyecto>;
  itemRecibido: Observable<Proyecto>;
  item: Proyecto = {
    nombre: '',
    nombreBusqueda: '',
    numero: '',
    cliente: '',
    key: '',
    pais: '',
    usuarioAlta: '',
    fechaAlta: 0,
    fechaEdicion: 0,
    estado: 0,

    };

  constructor(private sharedService: SharedService, public back: BackendService,
              private route: ActivatedRoute, private afs: AngularFirestore, private storage: AngularFireStorage) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.route.params
    .subscribe( parametros => {
    this.idRecibido = parametros.id;
    console.log(parametros.id);
    this.obtenerInformacion(this.idRecibido);
    this.getInfoClasificacion();
   });
 }

  obtenerInformacion(idRecibido) {

    this.itemDoc = this.afs.doc<Proyecto>('projects/' + idRecibido);
    this.itemDoc.valueChanges().subscribe(data => {
      console.log(data);
      this.item = data;
      this.clienteSeleccionado.nombre = data.cliente;
    });


    // console.log(this.item.nombre);

  }


  getInfoClasificacion() {
    this.itemsCollection = this.afs.collection<Cliente>('clients', ref => ref.orderBy('nombre'));
    console.log(this.itemsCollection);
    this.items = this.itemsCollection.valueChanges();
  }
  crearItem() {

    this.item.cliente = this.clienteSeleccionado.nombre;
    this.item.pais = this.clienteSeleccionado.pais;
    this.item.fechaEdicion = new Date().getTime();
    this.item.nombreBusqueda = this.sharedService.corregirCaracteres(this.item.nombre);
    this.itemDoc.update(this.item);
    this.submitted = true;

    window.scrollTo(0, 0);
  }
  cancel() {
    this.sharedService.cancelar();
  }


}

