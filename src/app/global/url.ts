import { HttpHeaders } from "@angular/common/http";

export class Url {

  httpOptions = { //al enviar usar
    headers : new HttpHeaders({
      'Content-Type':'application/json'
    })
  };
}
