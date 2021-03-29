import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-reportes-devolucion',
  templateUrl: './reportes-devolucion.component.html',
  styleUrls: ['./reportes-devolucion.component.css']
})
export class ReportesDevolucionComponent implements OnInit {

  private itemsCollection: AngularFirestoreCollection<ReporteDevolucion>;
  items: Observable<ReporteDevolucion[]>;
  itemDoc: AngularFirestoreDocument<Cliente>;

  constructor(private afs: AngularFirestore, public back: BackendService) { }

  ngOnInit() {
    this.getInfo();
    this.getNombreCliente('');
  }

  getInfo() {

    this.itemsCollection = this.afs.collection<ReporteDevolucion>('reportesDevolucion', ref => ref.orderBy('fechaCreacion'));
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.items = this.itemsCollection.stateChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as ReporteDevolucion;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  getNombreCliente(idRecibido: string) {
    
    console.log(idRecibido);
    // let itemDoc: AngularFirestoreDocument<any>;
    // itemDoc = this.afs.doc<Cliente>('clients/' + idRecibido);
    // itemDoc.snapshotChanges().subscribe(data => {
    //   console.log(data);
    //   map(actions => actions.map(a => {
    //     const data = a.payload.doc.data() as Proyecto;
    //     const id = a.payload.doc.id;
    //     return { id, ...data };
      // }))
    // itemDoc = this.afs.doc<Cliente>('clients/' + '0cdIs82jm7a9C9M84n8h');
    // itemDoc.valueChanges().subscribe(data => {
    //   console.log(data);



    // });

    let itemsCollection: AngularFirestoreCollection<Cliente>;
    let items: Observable<Cliente[]>;
    itemsCollection = this.afs.collection<Cliente>('clients', ref => ref.where('id', '==', '0cdIs82jm7a9C9M84n8h'));
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    items = itemsCollection.stateChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Cliente;
        const id = a.payload.doc.id;
        console.log(data.nombre);
        return { id, ...data };
      }))
    );
  }
  getNumeroCliente() {

  }
  getNombreProyecto() {

  }
  getNumeroProyecto() {

  }

}
