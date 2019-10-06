import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Proyecto>;
  items: Observable<Proyecto[]>;

    // Eliminar
    preguntaEliminar = false;
    eliminado = false;
    itemEliminar = '';
    nombreClienteEliminar = '';
  constructor(private afs: AngularFirestore) {
    this.getInfo();
   }

  ngOnInit() {
  }
  getInfo() {
    this.itemsCollection = this.afs.collection<Proyecto>('projects');
    this.items = this.itemsCollection.valueChanges();
    this.itemsCollection = this.afs.collection<Proyecto>('projects', ref => ref.orderBy('nombre'));
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Proyecto;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  eliminarSeleccionado(idSeleccionado, nombreSeleccionado) {
    this.itemEliminar = idSeleccionado;
    this.nombreClienteEliminar = nombreSeleccionado;
    this.preguntaEliminar = true;
    window.scrollTo(0, 0);
  }

  eliminar() {
    console.log(this.itemEliminar);
    this.preguntaEliminar = false;
    this.afs.doc<Proyecto>('projects/' + this.itemEliminar).delete();
    this.eliminado = true;
  }

}
