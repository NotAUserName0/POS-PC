import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  variableControlMenu: boolean = false
  inicio:boolean = true
  encargados:boolean = false

  constructor(){}

  @HostListener('document:click', ['$event'])
  outOfContext(event: Event) {
    const target = event.target as HTMLElement;
    const menu = document.getElementById("nav")
    if (!menu?.contains(target) && this.variableControlMenu) {
      this.closeMenu()
    }
  }

  displayMenu(){
    this.variableControlMenu = !this.variableControlMenu
    document.getElementById('nav')?.classList.toggle("menu-toggle")
    document.getElementById('reactive')?.classList.toggle("hide")
    document.getElementById('navbar')?.classList.toggle("show")
    document.getElementById('resultado')?.classList.toggle("res-toggle")
  }

  closeMenu() {
    this.variableControlMenu = false
    document.getElementById("nav")?.classList.toggle("menu-toggle")
    document.getElementById('reactive')?.classList.toggle("hide")
    document.getElementById('navbar')?.classList.toggle("show")
    document.getElementById('resultado')?.classList.toggle("res-toggle")
  }

}
