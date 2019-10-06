import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-editar-proyectos',
  templateUrl: './editar-proyectos.component.html',
  styleUrls: ['./editar-proyectos.component.css']
})
export class EditarProyectosComponent implements OnInit {

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
    estado: 0,

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

    this.itemDoc = this.afs.doc<Proyecto>('equipmentType/' + idRecibido);
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
  }


}

