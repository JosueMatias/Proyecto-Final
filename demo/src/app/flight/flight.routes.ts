import { Routes } from '@angular/router'; // Importa el módulo Routes desde Angular
import { FlightListComponent } from './flight-list/flight-list.component'; // Importa el componente FlightListComponent
import { FlightEditComponent } from './flight-edit/flight-edit.component'; // Importa el componente FlightEditComponent

// Define un conjunto de rutas utilizando la variable FLIGHT_ROUTES
export const FLIGHT_ROUTES: Routes = [
  {
    path: 'flights', // Ruta para mostrar la lista de vuelos
    component: FlightListComponent // Asocia la ruta con el componente FlightListComponent
  },
  {
    path: 'flights/:id', // Ruta para editar un vuelo específico, con un parámetro 'id'
    component: FlightEditComponent // Asocia la ruta con el componente FlightEditComponent
  }
];

