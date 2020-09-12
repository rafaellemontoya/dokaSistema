import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit {
  mensajeErrorImg = '';
  claseCargaImg = '';
  porcentajeCargaImg = '';
  submitted = false;
  imgError = false;

  item: Usuario = {
    seccion: '',
    modo: '',
    nombre: '',
    puesto: '',
    usuario: '',
    password: '',
    permisos: {
      usuarios: false,
      clientes: false,
      proyectos: false,
      materiales: false,
      damage: false,
      clasificacionEquipo: false,
      reportesObraWeb: false,
      reporteEquipoDamageWeb: false,
      reporteEnvioWeb: false,
      reporteDevolucionesWeb: false,
      reportesObraApp: false,
      reporteEquipoDamageApp: false,
      reporteEnvioApp: false,
      reporteDevolucionesApp: false

    },
    email: '',
    passwordEmail: '',
    nombreBusqueda: '',
    key: '',
    foto: '',
    pais: '',
    usuarioAlta: '',
    fechaAlta: 0,
    fechaEdicion:0,
    estado: 1
  }
  constructor(private sharedService: SharedService, private afs: AngularFirestore, public auth: AngularFireAuth) { }

  ngOnInit() {
  }
  getFile(event){

  }

  crearItem() {

    //this.item.usuarioAlta = keyUser;
    
    this.item.fechaAlta = new Date().getTime();
    this.item.nombreBusqueda = this.sharedService.corregirCaracteres(this.item.nombre);
    // const itemCollection = this.afs.collection<Usuario>('users/' + this.item.key);
    // itemCollection.add(this.item);

    const itemDoc = this.afs.doc<Usuario>('users/' + this.item.key);
    itemDoc.set(this.item);

    console.log(this.item);
    this.submitted = true;
    
  }
  cancel() {
    this.sharedService.cancelar();
  }
  signUp() {
    // this.authe.auth.signInWithEmailAndPassword(this.email, this.password);
    this.auth.auth.createUserWithEmailAndPassword(this.item.usuario, this.item.password).then(data => {
      console.log(data.user.uid);
      this.item.key = data.user.uid;
      this.crearItem();

    });

  }
}
