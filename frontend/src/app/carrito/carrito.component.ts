import { Component } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { Carrito } from '../models/Carrito';
import { NgIf } from '@angular/common';
import { Usuario } from '../models/Usuario';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-carrito',
  imports: [NgIf],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  listCarrito: Carrito[] = [];
  usuarioActual?: Usuario;

  constructor(private usuarioService: UsuarioService, private carritoService: CarritoService) { }

  ngOnInit(): void {
    this.getListCarrito();
  }

  getListCarrito() {
    this.listCarrito = this.carritoService.getCarrito();
  }

  getTotal() {
    return this.carritoService.total();
  }

  eliminarItem(index: number) {
    this.carritoService.eliminar(index);
    this.getListCarrito();
  }

  getWhatsAppLink() {
    const itemsMessage = this.listCarrito
      .map(item => `- ${item.producto.nombre} (Cantidad: ${item.cantidad}, Precio: ${item.producto.precio})`)
      .join('\n');

    const total = this.getTotal();

    const messageParts = [
      'Hola, me gustaría comprar estos productos:\n\n',
      itemsMessage,
      `\n\nTotal: $${total}`
    ];
    const formattedMessage = messageParts.join('');

    const url = `https://wa.me/3136329047?text=${encodeURIComponent(formattedMessage)}`;
    window.open(url, '_blank');

  }
}
