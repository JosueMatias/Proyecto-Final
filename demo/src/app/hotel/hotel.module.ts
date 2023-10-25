import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelEditComponent } from './hotel-edit/hotel-edit.component';
import { HotelService } from './hotel.service';
import { HOTEL_ROUTES } from './hotel.routes';

@NgModule({
  imports: [
    CommonModule, // Importa el módulo CommonModule para características comunes.
    FormsModule, // Importa el módulo FormsModule para trabajar con formularios en el componente.
    RouterModule.forChild(HOTEL_ROUTES) // Configura las rutas del módulo utilizando HOTEL_ROUTES.
  ],
  declarations: [
    HotelListComponent, // Declaración del componente para la vista de lista de hoteles.
    HotelEditComponent // Declaración del componente para la edición de hoteles.
  ],
  providers: [HotelService], // Proveedor del servicio de hoteles para inyección de dependencias.
  exports: [] // No exporta ningún componente o módulo.
})
export class HotelModule { }

