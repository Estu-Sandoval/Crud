import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore'
import { Libro } from '../models/libro';
import { map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private libroCollection:AngularFirestoreCollection<Libro>

  constructor(private db:AngularFirestore) {
    this.libroCollection = db.collection('Libros');
  }

  obtenerLibros(){
    return this.libroCollection.snapshotChanges().pipe(
      map(action=>action.map(a=>a.payload.doc.data()))
      );
  }

  crearLibro(nuevoLibro:Libro){
    return new Promise(async (resolve,reject)=>{
      try{
        const id = this.db.createId();
        nuevoLibro.idLibro = id;
        const resultado = await this.libroCollection.doc(id).set(nuevoLibro);
        resolve(resultado);
      }
      catch(error){
        reject(error);
      }
    })
  }

  modificarLibro(idLibro:string,nuevaData:Libro){
    return this.db.collection('Libros').doc(idLibro).update(nuevaData)
  }

  eliminarLibro(idLibro:string){
    return new Promise((resolve,reject)=>{
      try{
        const resp = this.libroCollection.doc(idLibro).delete()
        resolve(resp)
      }
      catch(error){
        reject(error)
      }
    })
  }
}
