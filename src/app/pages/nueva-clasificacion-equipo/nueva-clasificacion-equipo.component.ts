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


 itemClasificacion: ClasificacionEquipo = {
  key: '',
  nombre: '',
  manual: '',
  paginas: '',
  item: 0,
  pais: '',
  usuarioAlta: '',
  fechaAlta: 0,
  fechaEdicion: 0,
  nombreBusqueda:'',
  estado: 0,

   }

   constructor(private sharedService: SharedService, private afs: AngularFirestore) { }

   ngOnInit() { }

   nuevaClasificacion(){
     console.log(this.itemClasificacion);

     this.itemClasificacion.pais = 'MX';
     //this.item.usuarioAlta = keyUser;
     this.itemClasificacion.fechaAlta = new Date().getTime();
     const itemCollection = this.afs.collection<ClasificacionEquipo>('equipmentType');
     itemCollection.add(this.itemClasificacion);
     this.submitted = true;
   }


   cancel() {
     this.sharedService.cancelar();
   }





 }
