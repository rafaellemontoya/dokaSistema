import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

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
