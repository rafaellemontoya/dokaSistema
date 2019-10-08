import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-editar-tipo-dano',
  templateUrl: './editar-tipo-dano.component.html',
  styleUrls: ['./editar-tipo-dano.component.css']
})
export class EditarTipoDanoComponent implements OnInit {

  private itemsCollection: AngularFirestoreCollection<ClasificacionEquipo>;
 items: Observable<ClasificacionEquipo[]>;
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
  private itemDoc: AngularFirestoreDocument<TipoDano>;
  itemRecibido: Observable<TipoDano>;
  itemTipo: TipoDano = {
    key: '',
    nombreBusqueda:'',
    clasificacionEquipo: '',
    tipoDano: '',
    pais: '',
    usuarioAlta: '',
    fechaAlta:0,
    fechaEdicion: 0,
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
    this.getInfoClasificacion();
   });
 }

  obtenerInformacion(idRecibido) {

    this.itemDoc = this.afs.doc<TipoDano>('damage/' + idRecibido);
    this.itemDoc.valueChanges().subscribe(data => {
      console.log(data);
      this.itemTipo = data;
    });


    // console.log(this.item.nombre);

  }
  getInfoClasificacion() {
    this.itemsCollection = this.afs.collection<ClasificacionEquipo>('equipmentType');
    console.log(this.itemsCollection);
    this.items = this.itemsCollection.valueChanges();
  }

  crearItem() {
    this.itemTipo.pais = 'MX';

    this.itemTipo.fechaEdicion = new Date().getTime();
    this.itemTipo.nombreBusqueda = this.sharedService.corregirCaracteres(this.itemTipo.tipoDano);
    this.itemDoc.update(this.itemTipo);
    this.submitted = true;

    window.scrollTo(0, 0);
  }
  cancel() {
    this.sharedService.cancelar();
  }


}
