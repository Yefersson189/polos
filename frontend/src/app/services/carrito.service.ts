import { Injectable } from '@angular/core';
import { Carrito } from '../models/Carrito';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private listCarrito: Carrito[] = [];


  getCarrito() {
    this.obtenerSesion();
    return this.listCarrito;
  }

  agregar(producto: Producto, cantidad: number = 1) {
    this.obtenerSesion();
    const index = this.listCarrito.findIndex(item => item.producto.id == producto.id);

    if (index == -1) {
      const item = new Carrito(producto, cantidad);
      this.listCarrito.push(item);
    } else {
      this.actualizar(index, this.listCarrito[index].cantidad + cantidad);
    }
    this.guardarSesion();
  }

  actualizar(index: number, cantidad: number) {
    if (index >= 0 && index < this.listCarrito.length) {
      this.listCarrito[index].cantidad = cantidad;
      this.guardarSesion();
    }
  }

  cantidad() {
    this.obtenerSesion();
    return this.listCarrito.length;
  }

  total() {
    const total = this.listCarrito.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0)
    return total;
  }

  eliminar(index: number) {
    if (index >= 0 && index < this.listCarrito.length) {
      this.listCarrito.splice(index, 1);
      this.guardarSesion();
    }
  }

  guardarSesion() {
    localStorage.setItem('carrito', JSON.stringify(this.listCarrito));
  }

  obtenerSesion() {
    this.listCarrito = [];

    if (typeof window != 'undefined' && window.localStorage) {
      const carrito = localStorage.getItem('carrito');
      if (carrito != null) {
        this.listCarrito = JSON.parse(carrito);
      }
    }
  }


}
