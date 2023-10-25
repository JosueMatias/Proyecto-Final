import { NgModule } from '@angular/core'; // Importa el módulo NgModule desde Angular
import { CommonModule } from '@angular/common'; // Importa el módulo CommonModule para funcionalidades comunes
import { FormsModule } from '@angular/forms'; // Importa el módulo FormsModule para trabajar con formularios
import { RouterModule } from '@angular/router'; // Importa el módulo RouterModule para manejar rutas
import { FlightListComponent } from './flight-list/flight-list.component'; // Importa el componente FlightListComponent
import { FlightEditComponent } from './flight-edit/flight-edit.component'; // Importa el componente FlightEditComponent
import { FlightService } from './flight.service'; // Importa el servicio FlightService
import { FLIGHT_ROUTES } from './flight.routes'; // Importa las rutas específicas del módulo

@NgModule({
  imports: [
    CommonModule, // Importa el módulo CommonModule para funcionalidades comunes
    FormsModule, // Importa el módulo FormsModule para trabajar con formularios
    RouterModule.forChild(FLIGHT_ROUTES) // Configura las rutas específicas del módulo con RouterModule
  ],
  declarations: [
    FlightListComponent, // Declara el componente FlightListComponent
    FlightEditComponent // Declara el componente FlightEditComponent
  ],
  providers: [FlightService], // Provee el servicio FlightService a los componentes del módulo
  exports: [] // No exporta ningún componente o módulo
})
export class FlightModule { }
