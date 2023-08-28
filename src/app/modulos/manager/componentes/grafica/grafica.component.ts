import {AfterViewInit, Component, Input} from '@angular/core';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})

export class GraficaComponent implements AfterViewInit{
  @Input() datos : any[]
  chartOptions
  constructor() {
      this.chartOptions = {
          series: [
              {
                  name: "Desktops",
                  data: []
              }
          ],
          chart: {
              height: 280,
              type: "line",
              zoom: {
                  enabled: false
              }
          },
          dataLabels: {
              enabled: false
          },
          stroke: {
              curve: "straight"
          },
          grid: {
              row: {
                  colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                  opacity: 0.5
              }
          },
          xaxis: {
              categories: []
          }
      };
  }

  ngAfterViewInit(){
      console.log(this.datos)
      this.chartOptions.series[0].data = this.datos['y']
      this.chartOptions.xaxis.categories = this.datos['x']
  }
}
