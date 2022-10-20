import { Component, OnInit } from '@angular/core';
import { AlertaService } from 'src/app/servicios/alerta.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private miServicio:AlertaService) { }

  ngOnInit(): void {
  }

  lanzarDialogo(){
    this.miServicio.mostrarAlerta("Estoy siendo llamado desde el Home")
  }

  flores:string[] = [
    "https://us.123rf.com/450wm/sakarai/sakarai1910/sakarai191000642/132535234-hermosas-flores-de-frangipani-dise%C3%B1o-de-borde.jpg?ver=6",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIeXNEIbibj07B4FExzPjOwEXy1KgpMlQXtN4UqZOo&s",
    "https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://estag.fimagenes.com/img/1/W/p/8/Wp8_900.jpg"
  ]

  
  imprimirTexto(item: string){
    alert(item)
  }

}
