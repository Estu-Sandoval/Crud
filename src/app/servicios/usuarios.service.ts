import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {
  private usuarios:Usuario[];

  constructor() {
    this.usuarios = [
      {nombreUsuario:"Macarena",contrasena:"Maca123"},
      {nombreUsuario:"Azul",contrasena:"Azul123"},
      {nombreUsuario:"Lionel",contrasena:"Messi01"}
    ]
   }

   getUsers(){
    return this.usuarios;
   }


}
