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

  /* PAGINACION */
  paginas: number = 0; //filtro, elementos que entraran a la pagina
  elementosPerpag: number = 8 //elementos por pagina
  repeatArray: number[] //variable de control para el numero de botones de la paginacion
  numPaginas = 0  //cuantas paginas abra dependiendo el numero de elementos
  paginaActual = 0 //el id de la pagina
  /* FORM */
  addForm: FormGroup //form para agregar insumo
  error: boolean = false //variable de control para error en el form
  archivo: File | undefined //variable de almacenamiento del archivo para el form
  /* LISTA PROVEEDOR */
  listaProveedor = [] //variable de control para la lista de insumos para el proveedor
  /* INSUMOS */
  insumos: Insumo[] //array de insumos
  /* FILTRO */
  search: string = ''
  showPag: boolean = true
  /* VARIABLES DE CONTROL GLOBALES */
  loading: boolean = false //variable de control para mostrar el pop de cargando

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

  /* ESTADOS */

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

  ngOnDestroy(){
    this.socketService.disconnectSocket()
  }

  /* PAGINACION */

  pagination(pagina: any) {
    this.paginas = this.elementosPerpag * pagina
    this.paginaActual = pagina
    window.scrollTo(0, 0)
  }

  /* FILTRO */
  buscar(dato: any) {
    this.search = dato
    if (this.search.length != 0) {
      this.showPag = false
    } else {
      this.showPag = true
    }
  }

  /* FUNCIONAMIENTO */

  mostrarInsumos() {
    this.almacenService.obtenerInsumos().subscribe((response) => {
      this.insumos = response
      //lama a el servicio para obtener la lista inicial y asiganar a elementos
      this.numPaginas = Math.ceil(this.insumos?.length / this.elementosPerpag) //obtiene el numero de paginas
      this.repeatArray = Array.from({length: this.numPaginas}, (_, i) => i); //crea los botones de la pagina
    }, (error) => {
      console.log(error)
      const newError = {
        ubicacion: "ALMACEN",
        descripcion: "mostrarAlumnos method",
        contenido: error
      }
      this.almacenService.nuevoError(JSON.stringify(newError)).subscribe().closed
    })
  } /*DONE*/

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
          }).then(() => {
            //borra el form
            this.addForm.reset()
          })
        }, (error) => {
          console.log(error)
          const newError = {
            ubicacion: "ALMACEN",
            descripcion: "agregar method",
            contenido: error
          }
          this.loading = false
          this.almacenService.nuevoError(JSON.stringify(newError)).subscribe(
            res => {
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
          ).closed
        }
      )
    }
  } /*DONE*/

  async proveedor() {

    if (this.cookieService.check('lista')) {
      //crea una vista para la lista
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
        cancelButtonColor: '#f56666',
        showDenyButton: true,
        denyButtonText: 'Borrar',
        denyButtonColor: '#fdd32d'
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
              this.loading = true;
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
                    timer: 1500,
                    timerProgressBar: true,
                    customClass: {
                      title: 'barra'
                    }
                  }).then(() => {
                    this.cookieService.delete('lista')
                    this.listaProveedor = []
                    this.loading = false;
                  })
                }, error => {
                  this.loading = false
                  const newError = {
                    ubicacion: "ALMACEN",
                    descripcion: "proveedores method",
                    contenido: error
                  }
                  this.almacenService.nuevoError(JSON.stringify(newError)).subscribe(
                    res => {
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
                  ).closed
                }
              )
            }
          })
        }

        if(cnf.isDenied){
          this.cookieService.delete('lista')
          this.listaProveedor = []
          this.loading = false;
          Swal.fire({
            icon: 'success',
            title: 'Lista eliminada',
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
      })
    } else {
      Swal.fire("No hay nada en lista")
    }
  } /*DONE*/

  /* EXTRAS PARA AGREGAR */

  popIn() {
    document.getElementById("pop")?.classList.toggle("show")
  }

  popOut(event: Event) {
    document.getElementById("pop")?.classList.toggle("show")
  }

  onFileChange(event: any) {
    this.archivo = event.target.files[0];
  }

  /* EXTRAS PARA PROVEEDOR */

  addToList(data: any) {

    let idExistente

    if (this.listaProveedor.length == 0) { // si es el primer dato, luego luego pasa
      idExistente = false
    } else { //si no es el primero comprueba
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

}
