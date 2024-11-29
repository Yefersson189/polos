import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-form',
  imports: [NgIf],
  templateUrl: './form-producto.component.html',
  styleUrl: './form-producto.component.css'
})
export class FormProductoComponent {
  formProduct: FormGroup;
  isSaveInProgress: boolean = false;
  edit: boolean = false;
  showAlert: boolean = false;
  message: string = '';
  classAlert: string = '';

  constructor(private fb: FormBuilder,
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.formProduct = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      talla: ['', Validators.required],
      precio: [0, Validators.required, Validators.min(0)],
      imagen: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.edit = true;
      this.getProductoById(+id!)
    }
  }

  getProductoById(id: number) {
    this.productoService.getProductoById(id).subscribe({
      next: foundProduct => {
        this.formProduct.patchValue(foundProduct)
      },
      error: () => {
        this.showAlert = true;
        this.message = 'No se encontro producto';
        this.classAlert = 'alert-warning';
        this.router.navigateByUrl('/');
      }
    })
  }

  createProducto() {
    if (this.formProduct.invalid) {
      this.showAlert = true;
      this.message = 'Revise los campos e intente nuevamente';
      this.classAlert = 'alert-danger';
      return;
    }
    this.productoService.createProducto(this.formProduct.value).subscribe({
      next:() => {
        this.showAlert = true;
        this.message = 'Producto guardado correctamente';
        this.classAlert = 'alert-success';
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.showAlert = true;
        this.message = 'No se pudo guardar el producto';
        this.classAlert = 'alert-warning';
        this.router.navigateByUrl('/');
      }
    })
  }

  updateProducto() {
    if (this.formProduct.invalid) {
      this.showAlert = true;
      this.message = 'Revise los campos e intente nuevamente';
      this.classAlert = 'alert-danger';
      return;
    }
    this.productoService.updateProducto(this.formProduct.value).subscribe({
      next:() => {
        this.showAlert = true;
        this.message = 'Producto actualizado correctamente';
        this.classAlert = 'alert-success';
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.showAlert = true;
        this.message = 'No se pudo guardar el producto';
        this.classAlert = 'alert-warning';
        this.router.navigateByUrl('/');
      }
    })
  }

}
