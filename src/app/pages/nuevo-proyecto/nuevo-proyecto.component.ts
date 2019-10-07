import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nuevo-proyecto',
  templateUrl: './nuevo-proyecto.component.html',
  styleUrls: ['./nuevo-proyecto.component.css']
})
export class NuevoProyectoComponent implements OnInit {
   submitted = false;
   private itemsCollection: AngularFirestoreCollection<Cliente>;
  items: Observable<Cliente[]>;

  item: Proyecto = {
    nombre: '',
    nombreBusqueda: '',
    numero: '',
    cliente: '',
    key: '',
    pais: '',
    usuarioAlta: '',
    fechaAlta: 0,
    fechaEdicion:0,
    estado: 0,

    }

    constructor(private sharedService: SharedService, private afs: AngularFirestore) { }

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
      this.item.nombreBusqueda = this.sharedService.corregirCaracteres(this.item.nombre);

      const itemCollection = this.afs.collection<Proyecto>('projects');
      itemCollection.add(this.item);
      this.submitted = true;
    }


    cancel() {
      this.sharedService.cancelar();
    }





  }
