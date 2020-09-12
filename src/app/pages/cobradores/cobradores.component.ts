import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cobradores',
  templateUrl: './cobradores.component.html',
  styleUrls: ['./cobradores.component.css']
})
export class CobradoresComponent implements OnInit {


  private itemsCollection: AngularFirestoreCollection<Vendedores>;
  items: Observable<Vendedores[]>;
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
    this.itemsCollection = this.afs.collection<Vendedores>('cobradores', ref => ref.orderBy('cantidad'));
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Vendedores;
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
    this.afs.doc<Cliente>('cobradores/' + this.itemEliminar).delete();
    this.eliminado = true;
  }


}
