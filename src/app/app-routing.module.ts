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
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { ClasificacionEquipoComponent } from './pages/clasificacion-equipo/clasificacion-equipo.component';
import { TipoDanoComponent } from './pages/tipo-dano/tipo-dano.component';
import { MaterialesComponent } from './pages/materiales/materiales.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardVentasComponent } from './pages/dashboard-ventas/dashboard-ventas.component';
import { DashboardAvisosComponent } from './pages/dashboard-avisos/dashboard-avisos.component';
import { DashboardVideoComponent } from './pages/dashboard-video/dashboard-video.component';
import { DashboardCobranzaComponent } from './pages/dashboard-cobranza/dashboard-cobranza.component';
import { EditarClienteComponent } from './pages/editar-cliente/editar-cliente.component';
import { EditarClasificacionEquipoComponent } from './pages/editar-clasificacion-equipo/editar-clasificacion-equipo.component';
import { EditarMaterialComponent } from './pages/editar-materiales/editar-materiales.component';
import { EditarProyectosComponent } from './pages/editar-proyectos/editar-proyectos.component';
import { EditarTipoDanoComponent } from './pages/editar-tipo-dano/editar-tipo-dano.component';
import { EditarUsuarioComponent } from './pages/editar-usuario/editar-usuario.component';
import { ReportesEnvioComponent } from './pages/reportes-envio/reportes-envio.component';
import { ReportesDevolucionComponent } from './pages/reportes-devolucion/reportes-devolucion.component';
import { ReportesCapacitacionComponent } from './pages/reportes-capacitacion/reportes-capacitacion.component';
import { ReportesSeguimientoComponent } from './pages/reportes-seguimiento/reportes-seguimiento.component';
import { ReportesDanoComponent } from './pages/reportes-dano/reportes-dano.component';
import { CobrometroComponent } from './pages/cobrometro/cobrometro.component';
import { VendedoresComponent } from './pages/vendedores/vendedores.component';
import { NuevoVendedorComponent } from './pages/nuevo-vendedor/nuevo-vendedor.component';
import { CobradoresComponent } from './pages/cobradores/cobradores.component';
import { NuevoCobradorComponent } from './pages/nuevo-cobrador/nuevo-cobrador.component';
import { EditarCobradorComponent } from './pages/editar-cobrador/editar-cobrador.component';
import { EditarVendedorComponent } from './pages/editar-vendedor/editar-vendedor.component';


const routes: Routes = [
    { path: '', component: InicioComponent},
    // Rutas ingles
    {path: 'home', component: InicioComponent},
    {path: 'users', component: UsuariosComponent},

    // Rutas espanol
    {path: 'inicio', component: InicioComponent},
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'nuevo-usuario', component: NuevoUsuarioComponent},
    {path: 'nuevo-cliente', component: NuevoClienteComponent},
    {path: 'nuevo-tipo-dano', component: NuevoDanoComponent},
    {path: 'nueva-clasificacion-equipo', component: NuevaClasificacionEquipoComponent},
    {path: 'nuevo-material', component: NuevoMaterialComponent},
    {path: 'nuevo-proyecto', component: NuevoProyectoComponent},
    {path: 'clientes', component: ClientesComponent},
    {path: 'proyectos', component: ProyectosComponent},
    {path: 'materiales', component: MaterialesComponent},
    {path: 'clasificacion-equipo', component: ClasificacionEquipoComponent},
    {path: 'tipo-dano', component: TipoDanoComponent},
    {path: 'editar-cliente/:id', component: EditarClienteComponent},
    {path: 'editar-clasificacion-equipo/:id', component: EditarClasificacionEquipoComponent},
    {path: 'editar-materiales/:id', component: EditarMaterialComponent},
    {path: 'editar-proyectos/:id', component: EditarProyectosComponent},
    {path: 'editar-tipo-dano/:id', component: EditarTipoDanoComponent},
    {path: 'editar-usuario/:id', component: EditarUsuarioComponent},
    {path: 'tipo-dano', component: TipoDanoComponent},
    {path: 'reportes-envio', component: ReportesEnvioComponent},
    {path: 'reportes-devolucion', component: ReportesDevolucionComponent},
    {path: 'reportes-seguimiento', component: ReportesSeguimientoComponent},
    {path: 'reportes-capacitacion', component: ReportesCapacitacionComponent},
    {path: 'reportes-dano', component: ReportesDanoComponent},
    { path: 'dashboard-cobranza', component: DashboardCobranzaComponent },
    { path: 'dashboard-avisos', component: DashboardAvisosComponent },
    { path: 'dashboard-video', component: DashboardVideoComponent },
    { path: 'dashboard-cobrometro', component: CobrometroComponent },
    { path: 'dashboard-vendedores', component: VendedoresComponent },
    { path: 'nuevo-vendedor', component: NuevoVendedorComponent },
    { path: 'dashboard-cobradores', component: CobradoresComponent },
    { path: 'nuevo-cobrador', component: NuevoCobradorComponent },
    {path: 'editar-cobrador/:id', component: EditarCobradorComponent},
    {path: 'editar-vendedor/:id', component: EditarVendedorComponent},
];
@NgModule({
    imports: [
        RouterModule.forRoot( routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}
