import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-nuevo-proyecto',
  templateUrl: './nuevo-proyecto.component.html',
  styleUrls: ['./nuevo-proyecto.component.css']
})
export class NuevoProyectoComponent implements OnInit {
   submitted = false;
   private itemsCollection: AngularFirestoreCollection<Cliente>;
  items: Observable<Cliente[]>;

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

    }

    constructor(private sharedService: SharedService, private afs: AngularFirestore,
                public back: BackendService) { }

    ngOnInit() {
      this.getInfo();
    }

    getInfo() {
      this.itemsCollection = this.afs.collection<Cliente>('clients', ref => ref.orderBy('nombre'));
      console.log(this.itemsCollection);
      this.items = this.itemsCollection.valueChanges();
    }

    nuevoItem() {

      console.log(this.clienteSeleccionado);


      this.item.cliente = this.clienteSeleccionado.nombre;
      this.item.pais = this.clienteSeleccionado.pais;
      //this.item.usuarioAlta = keyUser;
      this.item.fechaAlta = new Date().getTime();
      this.item.nombreBusqueda = this.sharedService.corregirCaracteres(this.item.nombre);

      console.log(this.item);
      const itemCollection = this.afs.collection<Proyecto>('projects');
      itemCollection.add(this.item);
      this.submitted = true;
    }


    cancel() {
      this.sharedService.cancelar();
    }




    getInfoCliente(clienteSeleccionado: Cliente) {

      // console.log(clienteSeleccionado);
      this.item.pais = clienteSeleccionado.pais;
      this.item.cliente = clienteSeleccionado.nombre;
      
    }

  }
