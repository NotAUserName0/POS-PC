import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-estadisticas',
    templateUrl: './estadisticas.component.html',
    styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

    ventaIniciada: boolean = false

    mes: any[] = []
    tablaMes
    /* */
    yy: any[] = [10, 41, 35, 51, 49, 62, 69, 91, 148]
    xx: any[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]

    tablaSem
    /* */
    ejey:any[] = [10,41,31,25,84,10,78]
    ejex:any[] = ["Lun","Mar","Mie","Jue","Vie","Sab","Dom"]

    constructor() {

    }

    ngOnInit() {
        this.tablaMes = {
            x : this.xx,
            y : this.yy
        }

        this.tablaSem = {
            x : this.ejex,
            y : this.ejey
        }
    }

    estadoVenta() {
        this.ventaIniciada = !this.ventaIniciada
    }

}
