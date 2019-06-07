import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nuevo-dano',
  templateUrl: './nuevo-dano.component.html',
  styleUrls: ['./nuevo-dano.component.css']
})
export class NuevoDanoComponent implements OnInit {


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
