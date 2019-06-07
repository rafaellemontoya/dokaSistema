import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nuevo-material',
  templateUrl: './nuevo-material.component.html',
  styleUrls: ['./nuevo-material.component.css']
})
export class NuevoMaterialComponent implements OnInit {

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
