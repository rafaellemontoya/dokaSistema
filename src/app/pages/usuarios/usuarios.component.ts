import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Usuario>;
  items: Observable<Usuario[]>;
  constructor(private afs: AngularFirestore) {
    this.getInfo();
   }

  ngOnInit() {
  }
  getInfo(){
    this.itemsCollection = this.afs.collection<Usuario>('users');
    this.items = this.itemsCollection.valueChanges();
  }

}
