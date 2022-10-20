import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore'
import { Producto } from '../models/producto';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private coleccionProductos:AngularFirestoreCollection<Producto>;

  constructor(private db:AngularFirestore){
    this.coleccionProductos = db.collection('productos');
  }

  getProductos(){
    return this.coleccionProductos.snapshotChanges().
    pipe(map(action=>action.map(a=>a.payload.doc.data())));
  }

  createProducto(nuevoProducto:Producto,url:string){
    return new Promise(async (resolve,reject)=>{
      try{
        const id = this.db.createId();
        nuevoProducto.idProducto = id;
        nuevoProducto.img = url
        const respuesta = await this.coleccionProductos.doc(id).set(nuevoProducto);
        resolve(respuesta) 
        }
        catch(error){
          reject(error)
        }
    })
  }

  editarProducto(idProducto:string,nuevosDatos:Producto){
    return this.coleccionProductos.doc(idProducto).update(nuevosDatos)
  }

  deleteProducto(idProducto:string){
    return new Promise((resolve,reject)=>{
      try{
        const respuesta = this.coleccionProductos.doc(idProducto).delete()
        resolve(respuesta)
      }
      catch(error){
        reject(error)
      }
    })  
  }

}
