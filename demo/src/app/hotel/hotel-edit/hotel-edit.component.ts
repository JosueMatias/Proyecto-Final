import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../hotel.service';
import { Hotel } from '../hotel';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html'
})
export class HotelEditComponent implements OnInit {

  id!: string;
  hotel!: Hotel;
  feedback: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService) {
  }

  ngOnInit() {
    this
      .route
      .params
      .pipe(
        map(p => p['id']), // Obtiene el ID del parámetro de la ruta
        switchMap(id => {
          if (id === 'new') { return of(new Hotel()); } // Crea un nuevo hotel si el ID es 'new'
          return this.hotelService.findById(id); // Obtiene el hotel por ID
        })
      )
      .subscribe({
        next: hotel => {
          this.hotel = hotel; // Asigna el hotel obtenido
          this.feedback = {}; // Borra cualquier retroalimentación previa
        },
        error: err => {
          this.feedback = {type: 'warning', message: 'Error loading'}; // Muestra un mensaje de error
        }
      });
  }

  save() {
    this.hotelService.save(this.hotel).subscribe({
      next: hotel => {
        this.hotel = hotel; // Asigna el hotel actualizado
        this.feedback = {type: 'success', message: 'Save was successful!'}; // Muestra un mensaje de éxito
        setTimeout(async () => {
          await this.router.navigate(['/hotels']); // Redirige a la lista de hoteles después de guardar
        }, 1000);
      },
      error: err => {
        this.feedback = {type: 'warning', message: 'Error saving'}; // Muestra un mensaje de error
      }
    });
  }

  async cancel() {
    await this.router.navigate(['/hotels']); // Cancela la edición y redirige a la lista de hoteles
  }
}
