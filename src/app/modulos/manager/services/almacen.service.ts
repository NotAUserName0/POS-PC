import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Url } from 'src/app/global/url';
import { Insumo } from '../models/insumo.model';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {

  private URL = "http://127.0.0.1:3000/almacen/"

  constructor(private http:HttpClient,
    private url:Url) { }

  crearRegistro(datos:any){
    return this.http.post<any>(`${this.URL}add`,datos)
  }

  obtenerInsumos(){
    return this.http.get<Insumo[]>(`${this.URL}insumos`)
  }

  modificarInsumo(insumo:any){
    return this.http.put(`${this.URL}modificar`,insumo)
  }

  eliminarInsumo(id:any){
    return this.http.delete(`${this.URL}eliminar/${id}`)
  }

  enviarLista(data:any){
    return this.http.post(`${this.URL}lista`,data,this.url.httpOptions)
  }

  nuevoError(error:any){
    return this.http.post(`${this.URL}error`,error,this.url.httpOptions)
  }

}
