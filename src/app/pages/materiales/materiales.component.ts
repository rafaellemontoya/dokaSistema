import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
  }
}
