import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tipo-dano',
  templateUrl: './tipo-dano.component.html',
  styleUrls: ['./tipo-dano.component.css']
})
export class TipoDanoComponent implements OnInit {

  private itemsCollection: AngularFirestoreCollection<TipoDano>;
  items: Observable<TipoDano[]>;
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
    this.itemsCollection = this.afs.collection<TipoDano>('damage');
    this.items = this.itemsCollection.valueChanges();

    this.itemsCollection = this.afs.collection<TipoDano>('damage', ref => ref.orderBy('tipoDano'));
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as TipoDano;
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
    this.afs.doc<TipoDano>('damage/' + this.itemEliminar).delete();
    this.eliminado = true;
  }

}

