import { Component } from '@angular/core';
import { Producto } from '../../models/Producto';
import { ProductoService } from '../../services/producto.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-list',
  imports: [RouterLink],
  templateUrl: './list-producto.component.html',
  styleUrl: './list-producto.component.css'
})
export class ListProductoComponent {
  productos: Producto[] = [];
  isSave: boolean = false;

  constructor(private productoService: ProductoService, private carritoService: CarritoService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productoService.getProductos().subscribe((data) => {
      this.productos = data;
    })
  }

  eliminarProducto(id: number) {
    this.isSave = true;
    this.productoService.deleteProducto(id).subscribe({
      next: () => {
        this.toastr.success('Producto eliminado correctamente', 'Exito!!');
        this.isSave = false;
        this.getAllProducts();
      },
      error: () => {
        this.toastr.error('No se pudo eliminar el producto', 'Error!!');
        this.isSave = false;
      }
    })

  }

  agregarProducto(item: Producto) {
    this.carritoService.agregar(item);
  }

}
