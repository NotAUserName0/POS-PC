import {Component} from '@angular/core';
import {state, style, transition, trigger, animate} from '@angular/animations';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EncargadoService} from "../services/encargado.service";
import {Encargado} from "../models/encargado.model";
import {Socket} from "../../../global/socket";

@Component({
    selector: 'app-encargados',
    templateUrl: './encargados.component.html',
    styleUrls: ['./encargados.component.css'],
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
export class EncargadosComponent {
    addForm: FormGroup
    error: boolean = false
    loading: boolean = false
    encargados: Encargado[]

    constructor(private fb: FormBuilder,
                private encargadoService: EncargadoService,
                private socketService:Socket) {
        this.addForm = this.fb.group({
            nombre: ['', [Validators.required, Validators.maxLength(30)]],
            user: ['', [Validators.required, Validators.maxLength(12)]],
            contacto: ['', [Validators.required, Validators.maxLength(20)]],
            password: ['', [Validators.required, Validators.maxLength(12)]]
        })
        this.socketService.connectSocket()
        this.mostrar()
    }

    /* ESTADOS */
    ngOnInit() { //aqui cargo todos los listeners del socket
        this.socketService.socket.on('listaManager', () => {
            this.mostrar()
        })
    }

    ngOnDestroy(){
        this.socketService.disconnectSocket()
    }

    async cambiarNombre(nombre: any, id:any) {
        this.loading = true
        const newName = {
            nombre:nombre
        }
        this.encargadoService.modificar(JSON.stringify(newName),id).subscribe(
            result => {
                this.loading = false
                console.log(result)
                Swal.fire({
                    icon: 'success',
                    title: 'Modificado',
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
                console.log(error)
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
        )
    }

    async cambiarUsuario(user: any, id:any) {
        this.loading = true
        const newUser = {
            user:user
        }
        this.encargadoService.modificar(JSON.stringify(newUser),id).subscribe(
            result => {
                this.loading = false
                console.log(result)
                Swal.fire({
                    icon: 'success',
                    title: 'Modificado',
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
                console.log(error)
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
        )
    }

    async cambiarContacto(contacto: any, id:any) {
        this.loading = true
        const newContacto = {
            contacto:contacto
        }
        this.encargadoService.modificar(JSON.stringify(newContacto),id).subscribe(
            result => {
                this.loading = false
                console.log(result)
                Swal.fire({
                    icon: 'success',
                    title: 'Modificado',
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
                console.log(error)
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
        )
    }

    async cambiarPassword(password: any, id:any) {
        this.loading = true
        const newPassword = {
            password:password
        }
        this.encargadoService.modificar(JSON.stringify(newPassword),id).subscribe(
            result => {
                this.loading = false
                console.log(result)
                Swal.fire({
                    icon: 'success',
                    title: 'Modificado',
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
                console.log(error)
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
        )
    }

    async eliminarEncargado(id: any) {
        this.loading = true
        this.encargadoService.eliminarUno(id).subscribe((result)=>{
            this.loading = false
            console.log(result)
            Swal.fire({
                icon: 'success',
                title: 'Eliminado',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4500,
                timerProgressBar: true,
                customClass: {
                    title: 'barra'
                }
            })
        },(error)=>{
            this.loading = false
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Imposible Eliminar',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4500,
                timerProgressBar: true,
                customClass: {
                    title: 'barra'
                }
            })
        })
    }

    async limpiar() {
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

    /* FUNCIONAMIENTO */

    agregar() {
        if (this.addForm.valid) {
            this.error = false
            this.loading = true
            this.encargadoService.agregar(JSON.stringify(this.addForm.value)).subscribe(result => {
                console.log(result)
                this.loading = false
                document.getElementById("pop")?.classList.toggle("show")
                Swal.fire({
                    icon: 'success',
                    title: 'Encargado agregado',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 4500,
                    timerProgressBar: true,
                    customClass: {
                        title: 'barra'
                    }
                })
                this.addForm.reset()
            }, error => {
                const finalError = error.error.error
                console.log(error.error.error)
                this.loading = false
                Swal.fire({
                    icon: 'error',
                    title: 'Imposible agregar',
                    text: finalError,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 4500,
                    timerProgressBar: true,
                    customClass: {
                        title: 'barra'
                    }
                })
            })
        } else {
            this.error = true
        }
    }

    mostrar() {
        this.encargadoService.obtener().subscribe(result => {
            console.log(result)
            this.encargados = result
        }, error => {
            console.log(error)
        })
    }

    /* EXTRAS PARA AGREGAR */

    popIn() {
        document.getElementById("pop")?.classList.toggle("show")
    }

    popOut(event: Event) {
        document.getElementById("pop")?.classList.toggle("show")
    }
}
