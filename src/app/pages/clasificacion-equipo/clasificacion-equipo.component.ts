import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clasificacion-equipo',
  templateUrl: './clasificacion-equipo.component.html',
  styleUrls: ['./clasificacion-equipo.component.css']
})
export class ClasificacionEquipoComponent implements OnInit {

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
