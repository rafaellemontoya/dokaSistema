import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nueva-clasificacion-equipo',
  templateUrl: './nueva-clasificacion-equipo.component.html',
  styleUrls: ['./nueva-clasificacion-equipo.component.css']
})
export class NuevaClasificacionEquipoComponent implements OnInit {

  mensajeErrorImg = '';
  claseCargaImg = '';
  porcentajeCargaImg = '';
  submitted = false;
  constructor() { }

  ngOnInit() {
  }

  getFile(event){

  }

  nuevoEmpleado(){

  }
  cancel(){

  }

}
