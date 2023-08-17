import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './main/home.component';

const routes: Routes = [
  {path:'',component:HomeComponent,children:[
      {path:'',redirectTo:'admin',pathMatch:'full'},
      {path:'admin', loadChildren:()=>import('./modulos/admin/admin.module').then(res=>res.AdminModule)},
      {path:'encargado',loadChildren:()=>import('./modulos/manager/encargados.module').then(res=>res.EncargadosModule)}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
