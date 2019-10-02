import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-clasificacion-equipo',
  templateUrl: './clasificacion-equipo.component.html',
  styleUrls: ['./clasificacion-equipo.component.css']
})
export class ClasificacionEquipoComponent implements OnInit {
  preguntaEliminar = false;
  eliminado = false;

  itemEliminar = '';
  nombreClienteEliminar = '';

  private itemsCollection: AngularFirestoreCollection<ClasificacionEquipo>;
  items: Observable<ClasificacionEquipo[]>;

  constructor(private afs: AngularFirestore) {
    this.getInfo();
   }

  ngOnInit() {
  }

  getInfo() {
    this.itemsCollection = this.afs.collection<ClasificacionEquipo>('equipmentType');
    this.items = this.itemsCollection.valueChanges();

    this.itemsCollection = this.afs.collection<ClasificacionEquipo>('equipmentType',ref=>ref.orderBy('nombre'));
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as ClasificacionEquipo;
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
    this.afs.doc<ClasificacionEquipo>('equipmentType/' + this.itemEliminar).delete();
    this.eliminado = true;
  }

}
