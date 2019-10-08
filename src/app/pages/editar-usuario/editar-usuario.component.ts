import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Observable } from 'rxjs';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
=======
>>>>>>> 95378fb8ab43719057792faa2cabacb9d3e4f195

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  mensajeErrorImg = '';
  claseCargaImg = '';
<<<<<<< HEAD
  porcentajeCargaImg: '' ;
  submitted = false;
  imgError = false;
  selectedFile = null;
  estadoCargaImg = false;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;


  idRecibido = '';
  private itemDoc: AngularFirestoreDocument<Usuario>;
  itemRecibido: Observable<Usuario>;
  item: Usuario = {
    seccion: '',
    modo: '',
    nombre: '',
    puesto: '',
    usuario: '',
    password: '',
    permisos:{usuarios:false,
                clientes:false,
                proyectos: false,
                materiales: false,
                damage:false,
                clasificacionEquipo: false,
                reportesObraWeb: false,
                reporteEquipoDamageWeb:false,
                reporteEnvioWeb:false,
                reporteDevolucionesWeb:false,
                reportesObraApp: false,
                reporteEquipoDamageApp:false,
                reporteEnvioApp:false,
                reporteDevolucionesApp:false,
                },
    email: '',
    passwordEmail: '',
    nombreBusqueda: '',
    key: '',
    foto: '',
    pais:'',
    usuarioAlta:'',
    fechaAlta:0,
    fechaEdicion:0,
    estado:0,

    };

  constructor(private sharedService: SharedService,
              private route: ActivatedRoute, private afs: AngularFirestore, private storage: AngularFireStorage) { }

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

    this.itemDoc = this.afs.doc<Usuario>('user/' + idRecibido);
    this.itemDoc.valueChanges().subscribe(data => {
      console.log(data);
      this.item = data;
    });


    // console.log(this.item.nombre);

  }


  crearItem() {
    this.item.pais = 'MX';

    this.item.fechaEdicion = new Date().getTime();
    this.item.nombreBusqueda = this.sharedService.corregirCaracteres(this.item.nombre);
    this.itemDoc.update(this.item);
    this.submitted = true;

    window.scrollTo(0, 0);
  }
  cancel() {
    this.sharedService.cancelar();
=======
  porcentajeCargaImg = '';
  submitted = false;
  constructor() { }

  ngOnInit() {
>>>>>>> 95378fb8ab43719057792faa2cabacb9d3e4f195
  }

  getFile(event){

  }

  nuevoEmpleado(){

  }
<<<<<<< HEAD
 
=======
  cancel(){

  }
>>>>>>> 95378fb8ab43719057792faa2cabacb9d3e4f195

}
