import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.css']
})
export class MaterialesComponent implements OnInit {

  private itemsCollection: AngularFirestoreCollection<Material>;
  items: Observable<Material[]>;

  constructor(private afs: AngularFirestore) {
    this.getInfo();
   }

  ngOnInit() {
  }

  getInfo() {


    this.itemsCollection = this.afs.collection<Material>('material');
    this.items = this.itemsCollection.valueChanges();
    this.itemsCollection = this.afs.collection<Material>('material', ref => ref.orderBy('descripcion'));
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Material;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
}
