import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Log} from "../models/log.model";

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private URL = "http://127.0.0.1:3000/log/"

  constructor(private http:HttpClient) { }

  obtenerErrores(){
    return this.http.get<Log[]>(`${this.URL}errors`)
  }

  eliminarErrores(){
    return this.http.delete(`${this.URL}delErrors`)
  }

}
