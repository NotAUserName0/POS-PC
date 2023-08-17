import { Component } from '@angular/core';
import { state, style, transition, trigger,animate } from '@angular/animations';
import Swal from 'sweetalert2';

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
  encargados = [
    { id: '01', nombre: 'undefined', contacto: '55019201281', pass:'12345av' },
    { id: '01', nombre: 'undefined', contacto: '55019201281', pass:'12345av' },
    { id: '01', nombre: 'undefined', contacto: '55019201281', pass:'12345av' },
    { id: '01', nombre: 'undefined', contacto: '55019201281', pass:'12345av' },
    { id: '01', nombre: 'undefined', contacto: '55019201281', pass:'12345av' },
    { id: '01', nombre: 'undefined', contacto: '55019201281', pass:'12345av' },
    { id: '01', nombre: 'undefined', contacto: '55019201281', pass:'12345av' },
    { id: '01', nombre: 'undefined', contacto: '55019201281', pass:'12345av' },
    { id: '01', nombre: 'undefined', contacto: '55019201281', pass:'12345av' },
    { id: '01', nombre: 'undefined', contacto: '55019201281', pass:'12345av' },
    { id: '01', nombre: 'undefined', contacto: '55019201281', pass:'12345av' },
    { id: '01', nombre: 'undefined', contacto: '55019201281', pass:'12345av' },
    { id: '01', nombre: 'undefined', contacto: '55019201281', pass:'12345av' },
    { id: '01', nombre: 'undefined', contacto: '55019201281', pass:'12345av' },
    { id: '01', nombre: 'undefined', contacto: '55019201281', pass:'12345av' },
    { id: '01', nombre: 'undefined', contacto: '55019201281', pass:'12345av' },
    { id: '01', nombre: 'undefined', contacto: '55019201281', pass:'12345av' },
  ]

  async cambiarNombre(valor: any) {
    await Swal.fire({
      icon: 'warning',
      title: 'Cambiar nombre',
      input: 'text',
      inputLabel: 'Nombre Actual: ' + valor,
      inputPlaceholder: '',
      inputValidator: (val) => {
        if (!val) {
          return 'Necesitas escribir algo!'
        }
        return null
      }
    }).then((res) => {
      if (res.value) {
        Swal.fire({
          title: 'Estas seguro?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Si',
          denyButtonText: `No`,
        }).then((result) => {
          if (result.isConfirmed) {
            //msg en la respuesta del servicio o el error en el servicio
            Swal.fire('Guardado!', '', 'success')
          } else if (result.isDenied) {
            Swal.fire('Cancelado', '', 'info')
          }
        })
      }
    })
  }

  async cambiarContacto(valor: any) {
    await Swal.fire({
      icon: 'warning',
      title: 'Cambiar contacto',
      input: 'number',
      inputLabel: 'Contacto Actual: ' + valor,
      inputPlaceholder: '',
      inputValidator: (val) => {
        if (!val) {
          return 'Necesitas escribir algo!'
        }
        return null
      }
    }).then((res) => {
      if (res.value) {
        Swal.fire({
          title: 'Estas seguro?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Si',
          denyButtonText: `No`,
        }).then((result) => {
          if (result.isConfirmed) {
            //msg en la respuesta del servicio o el error en el servicio
            Swal.fire('Guardado!', '', 'success')
          } else if (result.isDenied) {
            Swal.fire('Cancelado', '', 'info')
          }
        })
      }
    })
  }

  async cambiarContra(valor:any){
    await Swal.fire({
      icon: 'warning',
      title: 'Cambiaras tu contraseña',
      input: 'text',
      inputPlaceholder: '',
      inputValidator: (val) => {
        if (!val) {
          return 'Necesitas escribir algo!'
        }
        return null
      }
    }).then((res) => {
      if (res.value) {
        Swal.fire({
          title: 'Estas seguro?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Si',
          denyButtonText: `No`,
        }).then((result) => {
          if (result.isConfirmed) {
            //msg en la respuesta del servicio o el error en el servicio
            Swal.fire('Guardado!', '', 'success')
          } else if (result.isDenied) {
            Swal.fire('Cancelado', '', 'info')
          }
        })
      }
    })
  }

  async eliminarEncargado(valor: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "No podras revertir esto! " + valor,
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

  agregar() {
    Swal.fire({
      title: 'Completa el formulario',
      html:
        '<input id="nombre" class="swal2-input" placeholder="Nombre">' +
        '<input id="contacto" class="swal2-input" placeholder="Contacto" type="number">' +
        '<input id="pass" class="swal2-input" placeholder="Contraseña">',
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
        const contacto = (document.getElementById('contacto') as HTMLInputElement).value;
        const pass = (document.getElementById('pass') as HTMLInputElement).value;
        if (!nombre || !contacto || !pass) {
          Swal.showValidationMessage('Por favor, completa todos los campos');
        }
        return { nombre: nombre, contacto: contacto , pass:pass};
      }
    }).then(result => {
      if (result.isConfirmed) {
        //crea el servicio para agregar
        console.log(JSON.stringify(result.value))
        //el res del servicio manda un swal
        Swal.fire({
          icon: 'success',
          title: 'Agregado',
        })
      }
    });
  }
}
