import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehiculo } from 'app/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {
  API_PATH = 'http://127.0.0.1:8000/api/vehiculos';
  constructor(private httpClient: HttpClient) { }
  
  // En esta función se construye la peticion para obtiener los vehiculos
  get(){
    return this.httpClient.get(this.API_PATH);
  }

  // En esta función se construye la peticion para guardar un vehiculo
  save(vehiculo: Vehiculo){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.httpClient.post(this.API_PATH, vehiculo, {headers: headers});
  }

  // En esta funcion se construye la peticion para eliminar un vehiculo
  delete(id: number){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    const body = {
      _method: 'DELETE'
    }
    return this.httpClient.post(this.API_PATH+'/'+id, body, {headers: headers});
  }
}
