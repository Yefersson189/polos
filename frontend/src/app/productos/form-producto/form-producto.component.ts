import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './form-producto.component.html',
  styleUrl: './form-producto.component.css'
})
export class FormProductoComponent {
  formProduct!: FormGroup;
  edit: boolean = false;

  constructor(private fb: FormBuilder,
    private productoService: ProductoService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.formProduct = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      talla: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
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
        this.toastr.error('No se encontro el producto', 'Error!!');
        this.router.navigateByUrl('/');
      }
    })
  }

  createProducto() {
    if (this.formProduct.invalid) {
      this.toastr.error('Revise los campos e intente nuevamente', 'Error!!');
      return;
    }
    this.productoService.createProducto(this.formProduct.value).subscribe({
      next:() => {
        this.toastr.success('Producto guardado correctamente', 'Exito!!');
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.toastr.error('No se pudo guardar el producto', 'Error!!');
        this.router.navigateByUrl('/');
      }
    })
  }

  updateProducto() {
    if (this.formProduct.invalid) {
      this.toastr.error('Revise los campos e intente nuevamente', 'Error!!');
      return;
    }
    this.productoService.updateProducto(this.formProduct.value).subscribe({
      next:() => {
        this.toastr.success('Producto actualizado correctamente', 'Exito!!');
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.toastr.error('No se pudo guardar el producto', 'Error!!');
        this.router.navigateByUrl('/');
      }
    })
  }

}
