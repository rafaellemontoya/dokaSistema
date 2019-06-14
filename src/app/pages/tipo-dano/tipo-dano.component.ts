import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tipo-dano',
  templateUrl: './tipo-dano.component.html',
  styleUrls: ['./tipo-dano.component.css']
})
export class TipoDanoComponent implements OnInit {

  private itemsCollection: AngularFirestoreCollection<TipoDano>;
  items: Observable<TipoDano[]>;

  constructor(private afs: AngularFirestore) {
    this.getInfo();
  }

  ngOnInit() {
  }

  getInfo() {
    this.itemsCollection = this.afs.collection<TipoDano>('damage');
    this.items = this.itemsCollection.valueChanges();
  }
}
