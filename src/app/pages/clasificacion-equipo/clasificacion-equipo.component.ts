import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clasificacion-equipo',
  templateUrl: './clasificacion-equipo.component.html',
  styleUrls: ['./clasificacion-equipo.component.css']
})
export class ClasificacionEquipoComponent implements OnInit {


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
  }

}
