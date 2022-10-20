import { Injectable } from '@angular/core';
import {deleteObject, getDownloadURL, getStorage, ref, UploadResult, uploadString} from 'firebase/storage'

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private respuesta:UploadResult

  private storage = getStorage()

  constructor() { }

  /*1) Obtener la referencia del storage
      (en este caso lo obtenemos con línea getStorage()).
    2) Dar la ruta donde se va a guardar la imagen dentro
      del storage.
    3) Creamos la tarea que se encarga de subir la imagen
      (en este caso estamos usando el método uploadString()).
    4) Obtener la url de la imagen subida.*/

  async subirImagen(nombre:string, imagen:any){
    try{
      let referenciaImagen = ref(this.storage,'productos/'+nombre)
      this.respuesta = await uploadString(referenciaImagen,imagen,'data_url')
      .then(resp=>{
        return resp
      })
      return this.respuesta
    }
    catch(error){
      console.log(error)
      return this.respuesta
    }
  }

obtenerUrlImagen(respuesta:UploadResult){
    return getDownloadURL (respuesta.ref)
}

eliminarImagen(urlmagen:string){
  let referenciaImagen = ref(this.storage,urlmagen);
  deleteObject(referenciaImagen)
  .then(resp=>{
    alert("La imagen fue eliminada con éxito");
  })
  .catch(err=>{
    alert("No se pudo eliminar la imagen. Error: "+err)
  })

}

}
