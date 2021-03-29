import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-nuevo-material',
  templateUrl: './nuevo-material.component.html',
  styleUrls: ['./nuevo-material.component.css']
})
export class NuevoMaterialComponent implements OnInit {

  submitted = false;
  private itemsCollection: AngularFirestoreCollection<Cliente>;
 items: Observable<Cliente[]>;

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

   }

   constructor(private sharedService: SharedService, private afs: AngularFirestore, public back: BackendService) { }

   ngOnInit() {
     this.getInfo();
   }

   getInfo() {
     this.itemsCollection = this.afs.collection<Cliente>('clients');
     console.log(this.itemsCollection);
     this.items = this.itemsCollection.valueChanges();
   }

   nuevoItem(){
     this.item.pais = 'MX';
     //this.item.usuarioAlta = keyUser;
     this.item.fechaAlta = new Date().getTime();
     this.item.nombreBusqueda = this.sharedService.corregirCaracteres(this.item.codigo);

     const itemCollection = this.afs.collection<Material>('material');
     itemCollection.add(this.item);
     this.submitted = true;
   }


   cancel() {
     this.sharedService.cancelar();
   }





 }
