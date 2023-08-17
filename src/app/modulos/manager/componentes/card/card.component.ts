import {Component, EventEmitter, Input, Output} from '@angular/core';
import {state, style, transition, trigger, animate} from '@angular/animations';
import {Insumo} from '../../models/insumo.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlmacenService} from "../../services/almacen.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
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
export class CardComponent {

  /* INSUMO */
  @Input() insumo: Insumo; //recive insumo de componente padre
  /* FORM */
  modForm: FormGroup // grupo de form
  archivo: File | undefined //variable de control de archivo
  error: boolean = false //variable de control de error
  /* MODIFICAR */
  show: boolean = false //variable de control para mostrar u ocultar menu de editar
  /* VARIABLES DE CONTROL GLOBALES */
  loading: boolean = false //variable de control para mostrar el pop de cargando


  constructor(private fb: FormBuilder,
              private almacenService: AlmacenService) {
  }

  /* ESTADOS */

  ngOnInit() {
    this.modForm = this.fb.group({
      id: [this.insumo['_id']],
      nombre: [this.insumo.nombre, [Validators.required, Validators.maxLength(12)]],
      tipo: [this.insumo.tipo, Validators.maxLength(12)]

    })
  }

  /* FUNCIONAMIENTO */

  modificar() {
    if (this.modForm.valid) {
      this.error = false
      this.loading = true
      const formData = new FormData() //lo subimos asi por si tiene o no archivo
      if (this.archivo == undefined) {
        formData.append('form', JSON.stringify(this.modForm.value))
      } else {
        formData.append('archivo', this.archivo, this.archivo.name)
        formData.append('form', JSON.stringify(this.modForm.value))
      }

      this.almacenService.modificarInsumo(formData).subscribe(res => {
          this.loading = false
          this.show = false
          Swal.fire({
            icon: 'success',
            title: 'Insumo Modificado',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4500,
            timerProgressBar: true,
            customClass: {
              title: 'barra'
            }
          })
        }, error => {
          this.loading = false
          const newError = {
            ubicacion: "CARD",
            descripcion: "modificar method",
            contenido: error
          }
          this.almacenService.nuevoError(JSON.stringify(newError)).subscribe(
            res => {
              Swal.fire({
                icon: 'error',
                title: 'Imposible modificar',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4500,
                timerProgressBar: true,
                customClass: {
                  title: 'barra'
                }
              })
            }
          ).closed
          console.log(error)
        }
      )
    } else {
      this.error = true
    }
  } /*DONE*/

  eliminar() {
    this.loading = true
    const id = this.modForm.get('id').value
    //el id se envia al
    this.almacenService.eliminarInsumo(id).subscribe((res) => {
      this.loading = true
      Swal.fire({
        icon: 'success',
        title: 'Insumo Eliminado',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4500,
        timerProgressBar: true,
        customClass: {
          title: 'barra'
        }
      })
    }, (error) => {
      this.loading = false
      const newError = {
        ubicacion: "CARD",
        descripcion: "eliminar method",
        contenido: error
      }
      this.almacenService.nuevoError(JSON.stringify(newError)).subscribe(
        res => {
          Swal.fire({
            icon: 'error',
            title: 'Imposible eliminar',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4500,
            timerProgressBar: true,
            customClass: {
              title: 'barra'
            }
          })
        }
      ).closed
      console.log(error)
    })
  } /*DONE*/

  /* EXTRAS PARA MODIFICAR */

  onFileChange(event: any) {
    this.archivo = event.target.files[0];
  }

  clickInfo() {
    //console.log(this.insumo)
    window.scrollTo(0, 0)
    this.show = true
  }

  clickOut(event) {
    this.show = false
  }

  /* EXPORTA VALORES PARA MODIFICAR LA LISTA DE PROVEEDORES */

  @Output() listItem = new EventEmitter<any>();

  listaAdd(event: any) {
    event.stopPropagation()

    const data = {
      id: this.modForm.get('id').value,
      nombre: this.modForm.get('nombre').value
    }
    this.listItem.emit(data)
  }

  @Output() listItemM = new EventEmitter<any>();

  listaMinus(event: any) {
    event.stopPropagation()
    const data = {
      id: this.modForm.get('id').value,
    }
    this.listItemM.emit(data)
  }

}
