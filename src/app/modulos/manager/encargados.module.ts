import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncargadosRoutingModule } from './encargados-routing.module';
import { TrabajadorComponent } from './trabajador/trabajador.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { AlmacenComponent } from './almacen/almacen.component';
import { ProductosComponent } from './productos/productos.component';
import { CardComponent } from './componentes/card/card.component';
import { FiltroPipe } from './filtros/filtro.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {NgApexchartsModule} from "ng-apexcharts";
import { GraficaComponent } from './componentes/grafica/grafica.component';


@NgModule({
  declarations: [
    TrabajadorComponent,
    EstadisticasComponent,
    AlmacenComponent,
    ProductosComponent,
    CardComponent,
    FiltroPipe,
    GraficaComponent
  ],
  imports: [
    CommonModule,
    EncargadosRoutingModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    NgApexchartsModule
  ]
})
export class EncargadosModule { }
