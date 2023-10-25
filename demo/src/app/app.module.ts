import { FlightModule } from './flight/flight.module'; // Importa el módulo de vuelos
import { HttpClientModule } from '@angular/common/http'; // Importa el módulo para realizar peticiones HTTP

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component'; // Importa el componente principal de la aplicación
import { APP_EXTRA_OPTIONS, APP_ROUTES } from './app.routes'; // Importa las rutas y opciones adicionales
import { HomeComponent } from './home/home.component'; // Importa el componente de la página de inicio
import { NavbarComponent } from './navbar/navbar.component'; // Importa el componente de la barra de navegación superior
import { SidebarComponent } from './sidebar/sidebar.component'; // Importa el componente de la barra lateral

@NgModule({
  imports: [
    BrowserModule, // Importa el módulo para la aplicación web
    HttpClientModule, // Importa el módulo para realizar peticiones HTTP
    FlightModule, // Importa el módulo de vuelos
    RouterModule.forRoot([...APP_ROUTES], {...APP_EXTRA_OPTIONS}), // Configura las rutas principales de la aplicación
  ],
  declarations: [
    AppComponent, // Declaración del componente principal
    SidebarComponent, // Declaración del componente de la barra lateral
    NavbarComponent, // Declaración del componente de la barra de navegación superior
    HomeComponent, // Declaración del componente de la página de inicio
  ],
  providers: [],
  bootstrap: [AppComponent] // Componente principal que se inicia al arrancar la aplicación
})
export class AppModule {
}
