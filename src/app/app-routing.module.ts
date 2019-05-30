import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';


const app_routes: Routes=[
    {path: '', component: InicioComponent},
    //Rutas ingles
    {path: 'home', component: InicioComponent},
    {path: 'users', component: UsuariosComponent},

    //Rutas espanol
    {path: 'inicio', component: InicioComponent},
    {path: 'usuarios', component: UsuariosComponent},
]
@NgModule({
    imports:[
        RouterModule.forRoot( app_routes)
    ]
})
export class AppRouting{

}