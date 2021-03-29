import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-nuevo-dano',
  templateUrl: './nuevo-dano.component.html',
  styleUrls: ['./nuevo-dano.component.css']
})
export class NuevoDanoComponent implements OnInit {


  submitted = false;
  private itemsCollection: AngularFirestoreCollection<ClasificacionEquipo>;
 items: Observable<ClasificacionEquipo[]>;

 item: TipoDano = {
  key: '',
  nombreBusqueda:'',
  clasificacionEquipo: '',
  tipoDano: '',
  pais: '',
  usuarioAlta: '',
  fechaAlta:0,
  fechaEdicion:0,
  estado:0,
  tipoDanoPT: ''

   }

   constructor(private sharedService: SharedService, private afs: AngularFirestore,
               public back: BackendService) { }

   ngOnInit() {
     this.getInfo();
   }

   getInfo() {
     this.itemsCollection = this.afs.collection<ClasificacionEquipo>('equipmentType');
     console.log(this.itemsCollection);
     this.items = this.itemsCollection.valueChanges();
   }

   nuevoDano(){
     this.item.pais = 'MX';
     //this.item.usuarioAlta = keyUser;
     this.item.fechaAlta = new Date().getTime();
     const itemCollection = this.afs.collection<TipoDano>('damage');
     itemCollection.add(this.item);
     this.submitted = true;
     window.scrollTo(0, 0);
   }


   cancel() {
     this.sharedService.cancelar();
   }





 }
