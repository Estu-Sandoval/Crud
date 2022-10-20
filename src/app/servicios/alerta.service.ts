import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor() { }

  mostrarAlerta(mensaje:string){
    alert(mensaje)
  }
}
