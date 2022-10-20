import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private servicioUsuarios:UsuariosService) { }

  losUsuarios:Usuario[]

  autos:string[]=[
    "https://fotos.perfil.com//2019/10/07/900/0/cuales-son-los-autos-mas-potentes-del-mundo-788463.jpg",
    "https://arc-anglerfish-arc2-prod-infobae.s3.amazonaws.com/public/4GSUPRZXXREO7A3YKFIT3W2RMM.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTCbFz-A6wd_tL57C8BNKRfF2ch_ghhZlt-9ZgdxXZMA&s",
    "https://media.revistagq.com/photos/5ca5e602944b834654eb8fe6/master/pass/los_10_coches_mas_caros_del_mundo_131086603.jpg"
  ]

  ngOnInit(): void {
    this.losUsuarios = this.servicioUsuarios.getUsers()

  }

}
