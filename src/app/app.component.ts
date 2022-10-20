import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Libro } from './models/libro';
import { Producto } from './models/producto';
import { AlertaService } from './servicios/alerta.service';
import { LibrosService } from './servicios/libros.service';
import { ProductosService } from './servicios/productos.service';
import { StorageService } from './servicios/storage.service';
import { UsuariosService } from './servicios/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  imagen:string;

  productos:Producto[];

  nombreImagen:string

  nuevoProducto = new FormGroup({
    nombre: new FormControl('',Validators.required),
    precio: new FormControl(0,Validators.required),
    descripcion: new FormControl('',Validators.required),
  })

  // libro = new FormGroup({
  //   titulo: new FormControl('',Validators.required),
  //   autor: new FormControl('',Validators.required),
  //   editorial: new FormControl('',Validators.required),
  //   ISBN: new FormControl(0,Validators.required),
  //   img: new FormControl('',Validators.required)
  // })

  modalVisible:boolean=false;

  productoSeleccionado:Producto;

  // coleccionDeLibros:Libro[]
  constructor(private servicio2:AlertaService, private servicioProductos:ProductosService, private servicioLibros:LibrosService,private servicioStorage:StorageService){

  }

  eliminarVisible:boolean = false

  items:MenuItem[];
  adminVisible=false

  ngOnInit(): void {
    this.items = [
      {
        label:"Home",
        icon:"pi pi-home",
        routerLink:"Home"
      },
      {
        label:"Admin",
        icon: "pi pi-user-plus",
        routerLink:"Admin",
        // visible:this.adminVisible
      }
    ]

    // this.servicioLibros.obtenerLibros().subscribe(libro=>{
    //   this.coleccionDeLibros=libro
    // })


    // this.servicioProductos.getProductos()

    this.servicioProductos.getProductos().subscribe(producto=>{
        this.productos = producto
    })
    
  }
  title = 'sevicios';

  textoBoton:string;

  libroSeleccionado:Libro;

  // if(!this.libro.invalid){
  //   let nuevoLibro:Libro = {
  //   titulo: this.libro.value.titulo!,
  //   editorial: this.libro.value.editorial!,
  //   autor: this.libro.value.autor!,
  //   ISBN: this.libro.value.ISBN!,
  //   idLibro:""
  // }

  //   this.servicioLibros.crearLibro(nuevoLibro).then((libro)=>{
  //     alert("El libro fue agregado con éxito")
  //   })
  //   .catch((error)=>{
  //     alert("El libro no pudo ser cargado\nError: "+error)
  //   })
  // }
  // else{
  //   alert("El formulario no está completo")
  // }



  // agregarLibro(){
  //   if(this.libro.valid){
  //     let nuevoLibro:Libro = {
  //       titulo: this.libro.value.titulo!,
  //       autor: this.libro.value.autor!,
  //       editorial: this.libro.value.editorial!,
  //       ISBN: this.libro.value.ISBN!,
  //       img: this.libro.value.img!,
  //       idLibro: ""
  //     }
  //     this.servicioLibros.crearLibro(nuevoLibro).then((libro)=>{
  //       alert("El libro fue agregado con éxito")
  //     })
  //     .catch((error)=>{
  //       alert("El libro no pudo ser cargado\nError: "+error)
  //     })
  //   }
  //   else{
  //     alert("El formulario no está completo")
  //   }
  // }

async agregarProducto(){
    if(this.nuevoProducto.valid){
      let nuevoProducto:Producto = {
        nombre: this.nuevoProducto.value.nombre!,
        precio: this.nuevoProducto.value.precio!,
        descripcion: this.nuevoProducto.value.descripcion!,
        img: "",
        idProducto: "",
        }
      
        this.servicioStorage.subirImagen(this.nombreImagen,this.imagen)
        .then(
          async res=>{
            this.servicioStorage.obtenerUrlImagen(res).
            then(
              async url=>{
                await this.servicioProductos.createProducto(nuevoProducto,url)
                .then(producto=>{
                  alert("Producto agregado con exito")
                })
                .catch(error=>{
                  alert("Ocurrió un error\nError: "+error)
                })
              }
            )
          }
        )

    }
    else{
    alert("Hay campos vacíos")
    }
}

  mostrarDialogo(){
    this.imagen = ""
    this.textoBoton = "Agregar Producto"
    this.modalVisible=true;
  }



  mostrar(){
    this.servicio2.mostrarAlerta("Estoy siendo llamado desde el AppComponent")
  }

  verificarUsuario(){
    this.ngOnInit()
  }


  actualizarProducto(){
    let nuevoProducto:Producto = {
      nombre: this.nuevoProducto.value.nombre!,
      precio: this.nuevoProducto.value.precio!,
      descripcion: this.nuevoProducto.value.descripcion!,
      img: "",
      idProducto: this.productoSeleccionado.idProducto,
      }

    this.servicioProductos.editarProducto(this.productoSeleccionado.idProducto,nuevoProducto)
    .then((resp)=>{
      alert("Producto actuealizado con éxito")
    })
    .catch((error)=>{
      alert("No se pudo actualizar el producto\nError: "+error)
    })
  }

  // editarLibro(){
  //   let datos:Libro = {
  //     titulo: this.libro.value.titulo!,
  //     autor: this.libro.value.autor!,
  //     editorial: this.libro.value.editorial!,
  //     ISBN: this.libro.value.ISBN!,
  //     img: this.libro.value.img!,
  //     idLibro: this.libroSeleccionado.idLibro
  //   }
  //   this.servicioLibros.modificarLibro(this.libroSeleccionado.idLibro,datos).then((libro)=>{
  //     alert("El libro fué modificado con éxito")
  //   })
  //   .catch((error)=>{
  //     alert("No se pudo modificar el libro\nError: "+error)
  //   })
  // }

  // mostrarEditar(libroSeleccionado:Libro){
  //   this.libroSeleccionado = libroSeleccionado
  //   this.textoBoton = "Editar Libro"
  //   this.modalVisible = true

  //   this.libro.setValue({
  //     titulo: libroSeleccionado.titulo,
  //     autor: libroSeleccionado.autor,
  //     editorial: libroSeleccionado.editorial,
  //     ISBN: libroSeleccionado.ISBN,
  //     img: libroSeleccionado.img
  //   })
  // }

  // cargarDatos(){
  //   if(this.textoBoton==="Agregar Libro"){
  //     this.agregarLibro()
  //   }
  //   else if(this.textoBoton === "Editar Libro"){
  //     this.editarLibro()
  //   }
  //   this.modalVisible = false
  //   this.libro.reset()
  // }

  mostrarEliminar(producto:Producto){
    this.eliminarVisible = true
    this.productoSeleccionado = producto
  }

  // borrarLibro(){
  //   this.servicioLibros.eliminarLibro(this.libroSeleccionado.idLibro).then((resp)=>{
  //     alert("El libro fue eliminado con éxito")
  //   })
  //   .catch((error)=>{
  //     alert("El libro no pudo ser eliminado\nError: "+error)
  //   })
  //   this.eliminarVisible = false
  // }



  eliminarProducto(){
    this.servicioProductos.deleteProducto(this.productoSeleccionado.idProducto)
    .then((resp)=>{
      this.servicioStorage.eliminarImagen(this.productoSeleccionado.img)
      alert("El producto fue elimnado con éxito")
    })
    .catch((err)=>{
      alert("No se pudo eliminar el producto\nError: "+err)
    })
    this.eliminarVisible = false
  }

  mostrarEditar(productoSeleccionado:Producto){
    this.productoSeleccionado = productoSeleccionado
    this.imagen = this.productoSeleccionado.img
    this.nuevoProducto.setValue({
      nombre: productoSeleccionado.nombre,
      descripcion: productoSeleccionado.descripcion,
      precio: productoSeleccionado.precio,
    })
    this.textoBoton = "Editar Producto"
    this.modalVisible = true
  }

  cargarProducto(){
    if(this.textoBoton === "Agregar Producto"){
      this.agregarProducto()
    }
    else if(this.textoBoton === "Editar Producto"){
      this.actualizarProducto()
    }
    this.nuevoProducto.reset()
    this.modalVisible = false
  }

  cargarImagen(event:any){
    let archivo = event.target.files[0];
    let reader = new FileReader();
    if(archivo!=undefined){
        reader.readAsDataURL(archivo)
        reader.onloadend = () => {
         let url = reader.result
          if(url!=null){
            this.nombreImagen = archivo.name
            this.imagen = url.toString()
          }
        }
      }
   }

  // cargarImagen(event:any){
  //   let archivo = event.target.files[0]
  //   let reader = new FileReader()
  // }

}

















// editarLibro(){
  // let datos:Libro = {
  //   titulo: this.libro.value.titulo!,
  //   autor: this.libro.value.autor!,
  //   editorial: this.libro.value.editorial!,
  //   ISBN: this.libro.value.ISBN!,
  //   idLibro: this.libroSeleccionado.idLibro
  // }
  // this.servicioLibros.modificarLibro(this.libroSeleccionado.idLibro,this.libroSeleccionado).then((libro)=>{
  //   alert("El libro fué modificado con éxito")
  // })
  // .catch((error)=>{
  //   alert("No se pudo modificar el libro\nError: "+error)
  // })
  // this.modalVisible = false;
  // this.libro.reset()
// }
