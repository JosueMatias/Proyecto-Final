import { Routes } from '@angular/router';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelEditComponent } from './hotel-edit/hotel-edit.component';

// Definición de las rutas para el módulo de hoteles
export const HOTEL_ROUTES: Routes = [
  {
    path: 'hotels', // Ruta para listar hoteles
    component: HotelListComponent // Componente que se mostrará al acceder a esta ruta
  },
  {
    path: 'hotels/:id', // Ruta para editar un hotel específico
    component: HotelEditComponent // Componente de edición de hoteles asociado a esta ruta
  }
];
