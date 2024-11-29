import { Component } from '@angular/core';
import { Producto } from '../../models/Producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list-producto.component.html',
  styleUrl: './list-producto.component.css'
})
export class ListProductoComponent {
  productos: Producto[] = [];

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void { }

  getAllProducts() {
    this.productoService.getProductos().subscribe((data) => {
      this.productos = data;
    })
  }

}
