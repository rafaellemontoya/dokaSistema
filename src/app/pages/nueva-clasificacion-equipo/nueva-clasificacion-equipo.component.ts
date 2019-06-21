import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-nueva-clasificacion-equipo',
  templateUrl: './nueva-clasificacion-equipo.component.html',
  styleUrls: ['./nueva-clasificacion-equipo.component.css']
})
export class NuevaClasificacionEquipoComponent implements OnInit {

  submitted = false;
  private itemsCollection: AngularFirestoreCollection<Cliente>;
 items: Observable<Cliente[]>;

 item: ClasificacionEquipo = {
   nombre: '',
   manual: '',
   paginas: '',
   item: 0,
   key: '',
   pais: '',
   usuarioAlta: '',
   fechaAlta: 0,
   estado: 0,

   }

   constructor(private sharedService: SharedService, private afs: AngularFirestore) { }

   ngOnInit() { }

   nuevaClasificacion(){
     console.log(this.item);

     this.item.pais = 'MX';
     //this.item.usuarioAlta = keyUser;
     this.item.fechaAlta = new Date().getTime();
     const itemCollection = this.afs.collection<ClasificacionEquipo>('equipmentType');
     itemCollection.add(this.item);
     this.submitted = true;
   }


   cancel() {
     this.sharedService.cancelar();
   }





 }
