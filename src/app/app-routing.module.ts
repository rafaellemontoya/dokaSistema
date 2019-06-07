import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { NuevoUsuarioComponent } from './pages/nuevo-usuario/nuevo-usuario.component';
import { NuevoClienteComponent } from './pages/nuevo-cliente/nuevo-cliente.component';
import { NuevoProyectoComponent } from './pages/nuevo-proyecto/nuevo-proyecto.component';
import { NuevoDanoComponent } from './pages/nuevo-dano/nuevo-dano.component';
import { NuevaClasificacionEquipoComponent } from './pages/nueva-clasificacion-equipo/nueva-clasificacion-equipo.component';
import { NuevoMaterialComponent } from './pages/nuevo-material/nuevo-material.component';


const app_routes: Routes=[
    {path: '', component: InicioComponent},
    //Rutas ingles
    {path: 'home', component: InicioComponent},
    {path: 'users', component: UsuariosComponent},

    //Rutas espanol
    {path: 'inicio', component: InicioComponent},
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'nuevo-usuario', component: NuevoUsuarioComponent},
    {path: 'nuevo-cliente', component: NuevoClienteComponent},
    {path: 'nuevo-tipo-dano', component: NuevoDanoComponent},
    {path: 'nueva-clasificacion-equipo', component: NuevaClasificacionEquipoComponent},
    {path: 'nuevo-material', component: NuevoMaterialComponent},

]
@NgModule({
    imports:[
        RouterModule.forRoot( app_routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouting{

}