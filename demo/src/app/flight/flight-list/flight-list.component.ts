import { Component, OnInit } from '@angular/core';
import { FlightFilter } from '../flight-filter'; // Importa el filtro de vuelos
import { FlightService } from '../flight.service'; // Importa el servicio 'FlightService'
import { Flight } from '../flight'; // Importa la clase 'Flight'

@Component({
  selector: 'app-flight',
  templateUrl: 'flight-list.component.html' // Establece la plantilla HTML para el componente
})
export class FlightListComponent implements OnInit {

  filter = new FlightFilter(); // Instancia un objeto de filtro de vuelos
  selectedFlight!: Flight; // Variable para el vuelo seleccionado
  feedback: any = {}; // Objeto para almacenar mensajes de retroalimentación

  // Propiedad para obtener la lista de vuelos desde el servicio 'FlightService'
  get flightList(): Flight[] {
    return this.flightService.flightList;
  }

  constructor(private flightService: FlightService) {
  }

  ngOnInit() {
    this.search(); // Realiza una búsqueda de vuelos al inicializar el componente
  }

  // Método para realizar una búsqueda de vuelos
  search(): void {
    this.flightService.load(this.filter);
  }

  // Método para seleccionar un vuelo
  select(selected: Flight): void {
    this.selectedFlight = selected;
  }

  // Método para eliminar un vuelo
  delete(flight: Flight): void {
    if (confirm('Are you sure?')) { // Solicita confirmación al usuario antes de eliminar
      this.flightService.delete(flight).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'}; // Muestra un mensaje de éxito
          setTimeout(() => {
            this.search(); // Realiza una búsqueda después de un segundo
          }, 1000);
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error deleting.'}; // Muestra un mensaje de advertencia en caso de error
        }
      );
    }
  }
}

