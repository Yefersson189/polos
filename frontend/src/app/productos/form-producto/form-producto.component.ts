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
  isSave: boolean = false;
  selectedFile: File | null = null;

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

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
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

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('imagen', this.selectedFile);
      formData.append('producto', new Blob([JSON.stringify(this.formProduct.value)], { type: "application/json" }));
      this.isSave = true;
      this.productoService.createProducto(formData).subscribe({
        next: () => {
          this.toastr.success('Producto guardado correctamente', 'Exito!!');
          this.isSave = false;
          this.router.navigateByUrl('/productos/list');
        },
        error: () => {
          this.toastr.error('No se pudo guardar el producto', 'Error!!');
          this.isSave = false;
        }
      })
    }

  }

  updateProducto() {
    if (this.formProduct.invalid) {
      this.toastr.error('Revise los campos e intente nuevamente', 'Error!!');
      return;
    }
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('imagen', this.selectedFile);
      formData.append('producto', new Blob([JSON.stringify(this.formProduct.value)], { type: "application/json" }));
      this.isSave = true;
      this.productoService.updateProducto(formData).subscribe({
        next: () => {
          this.toastr.success('Producto actualizado correctamente', 'Exito!!');
          this.isSave = false;
          this.router.navigateByUrl('/productos/list');
        },
        error: () => {
          this.toastr.error('No se pudo guardar el producto', 'Error!!');
          this.isSave = false;
        }
      })
    }
  }

}
