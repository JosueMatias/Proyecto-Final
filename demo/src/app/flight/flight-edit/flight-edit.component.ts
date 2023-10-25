import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'; // Debería ser '@angular/router' en lugar de '@angular/router'
import { FlightService } from '../flight.service';
import { Flight } from '../flight';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html'
})
export class FlightEditComponent implements OnInit {

  id!: string;
  flight!: Flight;
  feedback: any = {}; // Objeto para almacenar mensajes de retroalimentación

  constructor(
    private route: ActivatedRoute, // Inyección del servicio 'ActivatedRoute'
    private router: Router, // Inyección del servicio 'Router'
    private flightService: FlightService // Inyección del servicio 'FlightService'
  ) {
  }

  ngOnInit() {
    this
      .route
      .params
      .pipe(
        map(p => p.id), // Mapea los parámetros de la URL para obtener el 'id'
        switchMap(id => {
          if (id === 'new') { return of(new Flight()); } // Si el 'id' es 'new', se crea un nuevo objeto Flight
          return this.flightService.findById(id); // Se busca el vuelo por su 'id' usando el servicio 'FlightService'
        })
      )
      .subscribe(flight => {
          this.flight = flight; // Asigna el vuelo obtenido al atributo 'flight'
          this.feedback = {}; // Limpia cualquier mensaje de retroalimentación existente
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error loading'}; // En caso de error, se establece un mensaje de advertencia
        }
      );
  }

  save() {
    this.flightService.save(this.flight).subscribe(
      flight => {
        this.flight = flight; // Actualiza el vuelo con los cambios guardados
        this.feedback = {type: 'success', message: 'Save was successful!'}; // Muestra un mensaje de éxito
        setTimeout(() => {
          this.router.navigate(['/flights']); // Redirige al usuario a la lista de vuelos después de un segundo
        }, 1000);
      },
      // Se puede agregar una función de manejo de errores aquí si es necesario
    );
  }

  cancel() {
    this.router.navigate(['/flights']); // Redirige al usuario a la lista de vuelos sin guardar cambios
  }
}

