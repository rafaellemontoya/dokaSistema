import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css']
})
export class NuevoClienteComponent implements OnInit {
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
