import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nuevo-proyecto',
  templateUrl: './nuevo-proyecto.component.html',
  styleUrls: ['./nuevo-proyecto.component.css']
})
export class NuevoProyectoComponent implements OnInit {
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
