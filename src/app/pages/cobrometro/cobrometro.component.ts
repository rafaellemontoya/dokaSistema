import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Item {
  idPantalla: number;
}
@Component({
  selector: 'app-cobrometro',
  templateUrl: './cobrometro.component.html',
  styleUrls: ['./cobrometro.component.css']
})
export class CobrometroComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<any>;
  itemsDashActual: Observable<any[]>;


  pantallaObs: Observable<any[]>;
  pantalla2 = 0;
  private itemDoc: AngularFirestoreDocument<any>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.pantallaObs = this.afs.collectionGroup<any>('pantallaSeleccionadaDashboard' )
    .valueChanges();
    this.pantallaObs.subscribe(elements => {
    console.log(elements);
    this.pantalla2 = elements[0].idPantalla;
  });

  }
  obtenerDashboardActual(): string {
    if (this.pantalla2 === 0) {
      return 'Dashboard';
    } else {
      return 'Cobrómetro';
    }
  }
  crearItem(param: number) {
    const itemActualizar: Item = {idPantalla: param} ;


    this.itemDoc = this.afs.doc<any>('/pantallaSeleccionadaDashboard/WqUJUYAiH9rHkqbzF8Qf');
    this.itemDoc.update(itemActualizar);
  }
}
