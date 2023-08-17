import { state, style, transition, trigger,animate } from '@angular/animations';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease', style({opacity: 1}))
      ]),
      transition(':leave', [
        animate('400ms ease', style({opacity: 0}))
      ])
    ])
  ]
})
export class InicioComponent {

  logs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40
  ,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]

  constructor(){}

  async emailMe(){
    await Swal.fire({
      icon: 'warning',
      title: 'Ingresa tu correo',
      input: 'email',
      inputPlaceholder: '',
      inputValidator: (val) => {
        if (!val) {
          return 'Necesitas escribir algo!'
        }
        return null
      }
    }).then((res)=>{
      if(res){
        //hago el servicio el resultado
        Swal.fire({
          title:'Exito!!',
          icon:'success'
        })
      }
    })
  }

  async clean(){
    Swal.fire({
      title: 'Are you sure?',
      text: "No podras revertir esto! Se eliminara TODO ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminalo!'
    }).then((result) => {
      if (result.isConfirmed) {
        //msg en la respuesta del servicio o el error en el servicio
        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Cancelado', '', 'info')
      }
    })
  }
}
