import { Component, OnInit } from '@angular/core';
import { ReporteSeguimiento } from '../../interface/reporte-seguimiento.interface';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
export interface ReporteSeguimientoId extends ReporteSeguimiento { id: string; }
export interface UsuarioId extends Usuario { id: string; }
export interface Feed {
  nombreUsuario?: string;
  idUsuario?: string;
  cliente?: string;
  key: string;
}

export interface CollSignup {
  nombre: string;
  mob: string;
}

export interface ColChallange {
  idUsuario: string;
  cliente: string;
  key: string;
  fechaCreacion: number;
  pais: string;
}
@Component({
  selector: 'app-reportes-seguimiento',
  templateUrl: './reportes-seguimiento.component.html',
  styleUrls: ['./reportes-seguimiento.component.css']
})
export class ReportesSeguimientoComponent implements OnInit {
  private shirtCollection: AngularFirestoreCollection<ReporteSeguimiento>;
  items: Observable<ReporteSeguimientoId[]>;

  private usuariosCollection: AngularFirestoreCollection<Usuario>;
  itemsUsuarios: Observable<UsuarioId[]>;
  terminoBusquedaNombre = '';

  colChallangeCollection: AngularFirestoreCollection<ColChallange>;
  feedItem: Observable<Feed[]>;
  constructor(private afs: AngularFirestore) {
    // this.shirtCollection = afs.collection<ReporteSeguimiento>('reportesSeguimiento');
    // // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // // a lot of information about "what happened" with each change. If you want to
    // // get the data and the id use the map operator.
    // this.items = this.shirtCollection.snapshotChanges().pipe(
    //   map(actions => actions.map(a => {
    //     const data = a.payload.doc.data() as ReporteSeguimiento;
    //     const id = a.payload.doc.id;
    //     return { id, ...data };
    //   }))
    // );

    // this.usuariosCollection = afs.collection<Usuario>('users');
    // // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // // a lot of information about "what happened" with each change. If you want to
    // // get the data and the id use the map operator.
    // this.itemsUsuarios = this.usuariosCollection.snapshotChanges().pipe(
    //   map(actions => actions.map(a => {
    //     const data = a.payload.doc.data() as Usuario;
    //     const id = a.payload.doc.id;
    //     return { id, ...data };
    //   }))
    // );
   }

  ngOnInit() {
    this.sellectAllNews();
    this.imprimir();
  }
  eliminarSeleccionado() {

  }
  getNombreEmpleado(idUsuario: string) {
 
    // return this.itemsUsuarios.


  }

  collectionInitialization() {
    // console.log('data');
    this.colChallangeCollection = this.afs.collection('reportesSeguimiento');
    this.feedItem = this.colChallangeCollection.snapshotChanges().pipe(map(changes  => {
      return changes.map( change => {
        const data = change.payload.doc.data();
        const signupId = data.idUsuario;
        const fechaCreacionData = data.fechaCreacion;
        const paisData = data.pais;
        const key = change.payload.doc.id;
      



        return this.afs.doc('users/' + signupId).valueChanges().pipe(map( (collSignupData: CollSignup) => {
          // console.log(collSignupData);
          if (collSignupData !== undefined) {
            return Object.assign(
              {nombre: collSignupData.nombre, signup_id: signupId, id: key,
                fechaCreacion: fechaCreacionData,
              pais: paisData });
          } else {
            return Object.assign(
              {nombre: '-', signup_id: '-', id: key, fechaCreacion: fechaCreacionData,
              pais: paisData});
          }

            }
          ));
      });
    }), flatMap(feeds => combineLatest(feeds)));
  }
  sellectAllNews() {
    this.collectionInitialization();
    return this.feedItem;
  }

  async imprimir() {
    this.feedItem.forEach(value => {
      console.log(value);
    });
  }


}
