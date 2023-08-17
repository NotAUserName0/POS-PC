import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { AlmacenComponent } from './almacen/almacen.component';
import { ProductosComponent } from './productos/productos.component';
import { TrabajadorComponent } from './trabajador/trabajador.component';

const routes: Routes = [
  {path:'', redirectTo:'estadisticas',pathMatch:'full'},
  {path:'estadisticas',component:EstadisticasComponent},
  {path:'almacen',component:AlmacenComponent},
  {path:'productos',component:ProductosComponent},
  {path:'trabajadores',component:TrabajadorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncargadosRoutingModule { }
