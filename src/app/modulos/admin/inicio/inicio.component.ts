import { state, style, transition, trigger,animate } from '@angular/animations';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import {LogService} from "../services/log.service";
import {Log} from "../models/log.model";

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

  logs:Log[]

  constructor(private logService:LogService){}

  ngOnInit(){
    this.logService.obtenerErrores().subscribe(
      res=>{
        console.log(res)
        this.logs = res
      },error=>{
        console.log(error)
      }
    )
  }

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
        if(res.isConfirmed){
          Swal.fire({
            title:'Exito!!',
            icon:'success'
          })
        }
      }
    })
  } /* DONE */

  async clean(){
    Swal.fire({
      title: 'Are you sure?',
      text: "No podras revertir esto! Se eliminara TODO ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminalo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.logService.eliminarErrores().subscribe(()=>{
          Swal.fire('Eliminado!', '', 'success').then(()=>{
            location.reload()
          })
        })
      } else if (result.isDenied) {
        Swal.fire('Cancelado', '', 'info')
      }
    })
  } /* DONE */
}
