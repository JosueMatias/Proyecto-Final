import { Flight } from './flight'; // Importa la clase Flight para definir el tipo de datos
import { FlightFilter } from './flight-filter'; // Importa la clase FlightFilter para definir filtros
import { Injectable } from '@angular/core'; // Importa el decorador Injectable para marcar el servicio como inyectable
import { EMPTY, Observable } from 'rxjs'; // Importa Observable y EMPTY de RxJS
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'; // Importa el módulo HttpClient y otros para realizar solicitudes HTTP

@Injectable() // Marca el servicio como inyectable
export class FlightService {
  flightList: Flight[] = []; // Almacena una lista de vuelos en el servicio

  constructor(private http: HttpClient) {
  }

  findById(id: string): Observable<Flight> {
    const url = `http://www.angular.at/api/flight/${id}`; // URL para buscar un vuelo por ID
    const params = { 'id': id }; // Parámetros para la solicitud
    const headers = new HttpHeaders().set('Accept', 'application/json'); // Encabezados para la solicitud
    return this.http.get<Flight>(url, { params, headers }); // Realiza una solicitud GET y devuelve un Observable de Flight
  }

  load(filter: FlightFilter): void {
    this.find(filter).subscribe(result => {
      this.flightList = result; // Carga la lista de vuelos con el resultado de la búsqueda
    },
    err => {
      console.error('error loading', err); // Registra errores en la consola en caso de falla
    });
  }

  find(filter: FlightFilter): Observable<Flight[]> {
    const url = `http://www.angular.at/api/flight`; // URL para buscar vuelos con filtro
    const headers = new HttpHeaders().set('Accept', 'application/json'); // Encabezados para la solicitud

    const params = {
      'from': filter.from,
      'to': filter.to,
    }; // Parámetros para el filtro

    return this.http.get<Flight[]>(url, { params, headers }); // Realiza una solicitud GET y devuelve un Observable de una lista de vuelos
  }

  save(entity: Flight): Observable<Flight> {
    let params = new HttpParams();
    let url = '';
    const headers = new HttpHeaders().set('content-type', 'application/json'); // Encabezados para la solicitud
    if (entity.id) {
      url = `http://www.angular.at/api/flight/${entity.id.toString()}`; // URL para actualizar un vuelo existente
      params = new HttpParams().set('ID', entity.id.toString()); // Parámetros para la solicitud
      return this.http.put<Flight>(url, entity, { headers, params }); // Realiza una solicitud PUT para actualizar un vuelo
    } else {
      url = `http://www.angular.at/api/flight`; // URL para crear un nuevo vuelo
      return this.http.post<Flight>(url, entity, { headers, params }); // Realiza una solicitud POST para crear un nuevo vuelo
    }
  }

  delete(entity: Flight): Observable<Flight> {
    let params = new HttpParams();
    let url = '';
    const headers = new HttpHeaders().set('content-type', 'application/json'); // Encabezados para la solicitud
    if (entity.id) {
      url = `http://www.angular.at/api/flight/${entity.id.toString()}`; // URL para eliminar un vuelo por ID
      params = new HttpParams().set('ID', entity.id.toString()); // Parámetros para la solicitud
      return this.http.delete<Flight>(url, { headers, params }); // Realiza una solicitud DELETE para eliminar un vuelo
    }
    return EMPTY; // Retorna un Observable vacío si no se especifica un ID
  }
}


