import { Injectable } from '@angular/core';
import {Encargado} from "../models/encargado.model";
import {HttpClient} from "@angular/common/http";
import { Url } from "../../../global/url"

@Injectable({
  providedIn: 'root'
})
export class EncargadoService {

  private URL = "http://127.0.0.1:3000/encargados/"

  constructor(private http:HttpClient,
              private url:Url) { }

  agregar(encargado:any){
    return this.http.post<any>(`${this.URL}add`,encargado,this.url.httpOptions)
  }

  obtener(){
    return this.http.get<Encargado[]>(`${this.URL}obtener`)
  }

  modificar(dato:any,id:any){
    return this.http.put(`${this.URL}modificar/${id}`,dato,this.url.httpOptions)
  }

  eliminarUno(id:any){
    return this.http.delete(`${this.URL}eliminarUno/${id}`)
  }

  eliminarTodo(){
    return this.http.delete(`${this.URL}drop`)
  }
}
