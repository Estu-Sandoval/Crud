import { Injectable } from '@angular/core';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private servicioUsuarios:UsuariosService) { }

  usuarios=this.servicioUsuarios.getUsers()

  login(){
    let losUsuarios = this.usuarios
    let resp = false
    losUsuarios.forEach(usuario =>{
      if(usuario.nombreUsuario === "Lionel"){
        if(usuario.contrasena === "Messi01"){
          alert("Inició Sesión Correctamente")
          resp = true;
        }
      }
    })
    return resp;
  }
}
