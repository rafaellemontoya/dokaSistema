import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Usuario>;
  items: Observable<Usuario[]>;
  // Eliminar
  preguntaEliminar = false;
  eliminado = false;
  itemEliminar = '';
  nombreClienteEliminar = '';

  constructor(private afs: AngularFirestore, public back: BackendService) {
    this.getInfo();
   }

  ngOnInit() {
  }
  getInfo() {

    this.itemsCollection = this.afs.collection<Usuario>('users', ref => ref.orderBy('nombre'));
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Usuario;
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
    this.afs.doc<Usuario>('users/' + this.itemEliminar).delete();
    this.eliminado = true;
  }

  getNombrePais(pais: string) {
    switch (pais) {
      case 'MX':
        return 'México';
        break;
        case 'BR':
          return 'Brasil';
          break;
          case 'CH':
            return 'Chile';
            break;
            case 'CO':
              return 'Colombia';
              break;
              case 'PA':
                return 'Panamá';
                break;
                case 'PE':
                  return 'Perú';
                  break;

    }
  }
  getBanderaPais(pais: string) {
    switch (pais) {
      case 'MX':
        return 'assets/assets/img/mx.svg';
        break;
        case 'BR':
          return 'assets/assets/img/br.png';
          break;
          case 'CH':
            return 'assets/assets/img/ch.png';
            break;
            case 'CO':
              return 'assets/assets/img/co.png';
              break;
              case 'PA':
                return 'assets/assets/img/pa.png';
                break;
                case 'PE':
                  return 'assets/assets/img/pe.png';
                  break;

    }
  }
}

