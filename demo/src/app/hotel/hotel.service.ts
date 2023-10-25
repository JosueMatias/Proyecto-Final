import { Hotel } from './hotel';
import { HotelFilter } from './hotel-filter';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

// Configura las cabeceras de solicitud para aceptar JSON
const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable()
export class HotelService {
  hotelList: Hotel[] = [];
  api = 'http://www.angular.at/api/hotel'; // URL de la API de hoteles

  constructor(private http: HttpClient) {
  }

  // Encuentra un hotel por su ID
  findById(id: string): Observable<Hotel> {
    const url = `${this.api}/${id}`;
    const params = { id: id };
    return this.http.get<Hotel>(url, { params, headers });
  }

  // Carga la lista de hoteles aplicando un filtro
  load(filter: HotelFilter): void {
    this.find(filter).subscribe({
      next: result => {
        this.hotelList = result;
      },
      error: err => {
        console.error('error loading', err);
      }
    });
  }

  // Encuentra hoteles que coincidan con el filtro
  find(filter: HotelFilter): Observable<Hotel[]> {
    const params = {
      'city': filter.city,
    };

    return this.http.get<Hotel[]>(this.api, { params, headers });
  }

  // Guarda un hotel
  save(entity: Hotel): Observable<Hotel> {
    let params = new HttpParams();
    let url = '';
    if (entity.id) {
      url = `${this.api}/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.put<Hotel>(url, entity, { headers, params });
    } else {
      url = `${this.api}`;
      return this.http.post<Hotel>(url, entity, { headers, params });
    }
  }

  // Elimina un hotel por su ID
  delete(entity: Hotel): Observable<Hotel> {
    let params = new HttpParams();
    let url = '';
    if (entity.id) {
      url = `${this.api}/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.delete<Hotel>(url, { headers, params });
    }
    return EMPTY; // Retorna un Observable vacío si no se proporciona un ID.
  }
}
