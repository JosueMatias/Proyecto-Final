import { Component, OnInit } from '@angular/core';
import { HotelFilter } from '../hotel-filter'; // Importación del filtro de hoteles
import { HotelService } from '../hotel.service'; // Importación del servicio de hoteles
import { Hotel } from '../hotel'; // Importación del modelo de datos para hoteles

@Component({
  selector: 'app-hotel',
  templateUrl: 'hotel-list.component.html' // Plantilla HTML asociada al componente
})
export class HotelListComponent implements OnInit {

  filter = new HotelFilter(); // Instancia del filtro de hoteles
  selectedHotel!: Hotel; // Hotel seleccionado
  feedback: any = {}; // Retroalimentación o mensajes de estado

  // Propiedad que devuelve la lista de hoteles desde el servicio
  get hotelList(): Hotel[] {
    return this.hotelService.hotelList;
  }

  constructor(private hotelService: HotelService) {
    // Constructor del componente, inyecta el servicio de hoteles
  }

  ngOnInit() {
    this.search(); // Al inicializar el componente, realiza una búsqueda
  }

  // Realiza una búsqueda de hoteles según el filtro especificado
  search(): void {
    this.hotelService.load(this.filter);
  }

  // Selecciona un hotel para su edición
  select(selected: Hotel): void {
    this.selectedHotel = selected;
  }

  // Elimina un hotel (con confirmación)
  delete(hotel: Hotel): void {
    if (confirm('eSTAS SEGURO DE ELIMINARLO?')) {
      this.hotelService.delete(hotel).subscribe({
        // Realiza una solicitud para eliminar el hotel y maneja las respuestas
        next: () => {
          this.feedback = {type: 'success', message: 'Eliminado Correctamente!'};
          // Muestra un mensaje de éxito y vuelve a realizar una búsqueda después de un segundo
          setTimeout(() => {
            this.search();
          }, 1000);
        },
        error: err => {
          this.feedback = {type: 'warning', message: 'Error deleting.'};
          // Muestra un mensaje de error en caso de fallo
        }
      });
    }
  }
}
