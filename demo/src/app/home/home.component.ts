import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None // No se aplica encapsulación de estilos
})
export class HomeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute) {
  }

  needsLogin: boolean | undefined;
  _userName: string = ''; // Nombre de usuario privado

  ngOnInit() {
    // Comprueba si se necesita iniciar sesión a través de los parámetros de la ruta
    this.needsLogin = !!this.route.snapshot.params['needsLogin'];
  }

  // Propiedad calculada para obtener el nombre de usuario
  get userName(): string {
    return this._userName;
  }

  // Método para iniciar sesión
  login(): void {
    this._userName = 'Matias'; // Establece el nombre de usuario
  }

  // Método para cerrar sesión
  logout(): void {
    this._userName = ''; // Borra el nombre de usuario
  }
}

