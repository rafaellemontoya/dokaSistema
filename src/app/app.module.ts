import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { InicioComponent } from './pages/inicio/inicio.component';

import { NuevoUsuarioComponent } from './pages/nuevo-usuario/nuevo-usuario.component';
import { EditarUsuarioComponent } from './pages/editar-usuario/editar-usuario.component';
import { NuevoClienteComponent } from './pages/nuevo-cliente/nuevo-cliente.component';
import { NuevoProyectoComponent } from './pages/nuevo-proyecto/nuevo-proyecto.component';
import { ClasificacionEquipoComponent } from './pages/clasificacion-equipo/clasificacion-equipo.component';
import { NuevaClasificacionEquipoComponent } from './pages/nueva-clasificacion-equipo/nueva-clasificacion-equipo.component';
import { NuevoDanoComponent } from './pages/nuevo-dano/nuevo-dano.component';
import { NuevoMaterialComponent } from './pages/nuevo-material/nuevo-material.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { MaterialesComponent } from './pages/materiales/materiales.component';
import { TipoDanoComponent } from './pages/tipo-dano/tipo-dano.component';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UsuariosComponent,
    InicioComponent,
    NuevoUsuarioComponent,
    EditarUsuarioComponent,
    NuevoClienteComponent,
    NuevoProyectoComponent,
    ClasificacionEquipoComponent,
    NuevaClasificacionEquipoComponent,
    NuevoDanoComponent,
    NuevoMaterialComponent,
    ClientesComponent,
    ProyectosComponent,
    MaterialesComponent,
    TipoDanoComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [AngularFirestore, AngularFireStorageModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
