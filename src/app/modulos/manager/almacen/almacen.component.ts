import {Component, HostListener, OnInit} from '@angular/core';
import {state, style, transition, trigger, animate} from '@angular/animations';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {AlmacenService} from '../services/almacen.service';
import {Insumo} from '../models/insumo.model';
import {Socket} from 'src/app/global/socket';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.css'],
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
export class AlmacenComponent implements OnInit {

  paginas: number = 0;
  elementosPerpag: number = 8
  repeatArray: number[]
  numPaginas = 0
  paginaActual = 0
  addForm: FormGroup
  error: boolean = false
  listaProveedor = []
  archivo: File | undefined
  insumos: Insumo[]
  loading: boolean = false

  constructor(private fb: FormBuilder,
              private almacenService: AlmacenService,
              private socketService: Socket,
              private cookieService: CookieService) {
    this.addForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(12)]],
      tipo: ['', Validators.maxLength(12)],
    })
    this.socketService.connectSocket()
    this.mostrarInsumos()
  }

  ngOnInit() {
    if (this.cookieService.check('lista')) {
      const recover = this.cookieService.get('lista')
      this.listaProveedor = JSON.parse(recover)
    }
    //hago la primer llamada a el objeto insumos
    this.socketService.socket.on('recargar', () => {
      this.mostrarInsumos()
    })
  }

  mostrarInsumos() {
    this.almacenService.obtenerInsumos().subscribe((response) => {
      this.insumos = response
      //lama a el servicio para obtener la lista inicial y asiganar a elementos
      this.numPaginas = Math.ceil(this.insumos?.length / this.elementosPerpag) //obtiene el numero de paginas
      this.repeatArray = Array.from({length: this.numPaginas}, (_, i) => i); //crea los botones de la pagina
    }, (error) => {
      console.log(error)
    })
  } /*DONE*/

  popIn() {
    document.getElementById("pop")?.classList.toggle("show")
  }

  popOut(event: Event) {
    document.getElementById("pop")?.classList.toggle("show")
  }

  pagination(pagina: any) {
    this.paginas = this.elementosPerpag * pagina
    this.paginaActual = pagina
    window.scrollTo(0, 0)
  }

  onFileChange(event: any) {
    this.archivo = event.target.files[0];
  }

  agregar() {

    if (!this.addForm.valid) {
      this.error = true
    } else {
      this.loading = true;
      const formData = new FormData()
      formData.append('nombre', this.addForm.get('nombre')?.value)
      formData.append('tipo', this.addForm.get('tipo')?.value)
      if (this.archivo) {
        formData.append('archivo', this.archivo, this.archivo.name)
      }
      this.almacenService.crearRegistro(formData).subscribe(
        res => {
          this.error = false
          this.loading = false
          document.getElementById("pop")?.classList.toggle("show")
          Swal.fire({
            icon: 'success',
            title: 'Insumo agregado',
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
          console.log(error)
          Swal.fire({
            icon: 'error',
            title: 'Imposible agregar',
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
      )
    }
  } /*DONE*/

  addToList(data: any) {

    let idExistente

    if(this.listaProveedor.length == 0){ // si es el primer dato, luego luego pasa
      idExistente = false
    }else{ //si no es el primero comprueba
      idExistente = this.listaProveedor.some(objeto => objeto.id === data?.id);
    }

    if (!idExistente) {
      this.listaProveedor.push(data)
      this.cookieService.set('lista', JSON.stringify(this.listaProveedor))
      Swal.fire({
        icon: 'success',
        title: 'Agregado a lista',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4500,
        timerProgressBar: true,
        customClass: {
          title: 'barra'
        }
      })
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Ya esta en lista',
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
  }

  delFromList(data: any) {
    console.log(this.listaProveedor)
    if (this.listaProveedor.length != 0) {
      this.listaProveedor = this.listaProveedor.filter(objeto => objeto.id !== data?.id);
      this.cookieService.set('lista', JSON.stringify(this.listaProveedor))
      if (this.listaProveedor.length == 0) {
        this.cookieService.delete('lista')
      }
      Swal.fire({
        icon: 'success',
        title: 'Eliminado de la lista',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4500,
        timerProgressBar: true,
        customClass: {
          title: 'barra'
        }
      })
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Lista vacia',
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
  }

  async proveedor() {

    console.log(this.cookieService.check('lista'))
    console.log(this.listaProveedor)

    if (this.cookieService.check('lista')) {
      //crea una vista para la lista
      this.loading = true;
      console.log(JSON.stringify(this.listaProveedor))
      const listaHtml = this.listaProveedor.map(objeto => `<li class="proveedor">${objeto.nombre}</li>`).join('');

      const alertaHtml = `
    <div>
      <style>
        .lista-estilizada {
          padding: 0;
          list-style-type: none;
          margin-left: 0;
        }
      </style>
      <ul class="lista-estilizada">${listaHtml}</ul>
    </div>
  `;

      await Swal.fire({
        title: 'Lista de Objetos',
        html: alertaHtml,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Continuar',
        showCloseButton: true,
        cancelButtonColor: '#f56666'
      }).then(async (cnf) => {
        if (cnf.isConfirmed) {
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
          }).then((email) => {
            if (email.isConfirmed) {
              //servicio
              console.log(email.value)

              const data = {
                email: email.value,
                lista: this.listaProveedor
              }

              this.almacenService.enviarLista(JSON.stringify(data)).subscribe(
                res => {
                  console.log(res)
                  Swal.fire({
                    icon: 'success',
                    title: 'Revisa tu correo',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 4500,
                    timerProgressBar: true,
                    customClass: {
                      title: 'barra'
                    }
                  }).then(() => {
                    console.log("borrando lista")
                    this.cookieService.delete('lista')
                    this.listaProveedor = []
                    this.loading = false;
                  })
                }, error => {
                  Swal.fire({
                    icon: 'success',
                    title: 'Imposible conectar con servidor SMTP',
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
              )
            }
          })
        }
      })
    } else {
      Swal.fire("No hay nada en lista")
    }
  } /*DONE*/

}
