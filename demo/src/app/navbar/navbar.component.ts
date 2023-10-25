import { Component } from '@angular/core';

@Component({
  selector: 'navbar-cmp',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'] // Asegúrate de que esté aquí
})
export class NavbarComponent {

  private sidebarVisible: boolean = false; // Variable para rastrear la visibilidad de la barra lateral.

  constructor() {
  }

  // Función para alternar la visibilidad de la barra lateral.
  sidebarToggle() {
    const body = document.getElementsByTagName('body')[0]; // Obtiene el elemento <body> del documento.

    if (!this.sidebarVisible) { // Si la barra lateral no está visible...
      body.classList.add('nav-open'); // Agrega la clase 'nav-open' al cuerpo para mostrar la barra lateral.
      this.sidebarVisible = true; // Actualiza la variable que rastrea la visibilidad.
      console.log('making sidebar visible...'); // Registra un mensaje de registro.
    } else {
      this.sidebarVisible = false; // Si la barra lateral ya está visible, oculta la barra lateral.
      body.classList.remove('nav-open'); // Elimina la clase 'nav-open' del cuerpo para ocultar la barra lateral.
    }
    
  }
}
