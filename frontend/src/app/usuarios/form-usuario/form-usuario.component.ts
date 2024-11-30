import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './form-usuario.component.html',
  styleUrl: './form-usuario.component.css'
})
export class FormUsuarioComponent {
  formUser!: FormGroup;
  edit: boolean = false;
  isSave: boolean = false;

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.formUser = this.fb.group({
      id: [null],
      nombreCompleto: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      clave: ['', Validators.required],
      correo: ['', Validators.required],
      celular: ['', Validators.required],
      direccion: ['', Validators.required],
      estado: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.edit = true;
      this.getUsuarioById(+id!)
    }
  }

  getUsuarioById(id: number) {
    this.usuarioService.getUsuarioById(id).subscribe({
      next: foundProduct => {
        this.formUser.patchValue(foundProduct)
      },
      error: () => {
        this.toastr.error('No se encontro el usuario', 'Error!!');
        this.router.navigateByUrl('/usuarios/list');
      }
    })
  }

  createUsuario() {
    if (this.formUser.invalid) {
      this.toastr.error('Revise los campos e intente nuevamente', 'Error!!');
      return;
    }
    this.isSave = true;
    this.usuarioService.createUsuario(this.formUser.value).subscribe({
      next:() => {
        this.toastr.success('Usuario guardado correctamente', 'Exito!!');
        this.isSave = false;
        this.router.navigateByUrl('/usuarios/list');
      },
      error: () => {
        this.toastr.error('No se pudo guardar el usuario', 'Error!!');
        this.isSave = false;
      }
    })
  }

  updateUsuario() {
    if (this.formUser.invalid) {
      this.toastr.error('Revise los campos e intente nuevamente', 'Error!!');
      return;
    }
    this.isSave = true;
    this.usuarioService.updateUsuario(this.formUser.value).subscribe({
      next:() => {
        this.toastr.success('Usuario actualizado correctamente', 'Exito!!');
        this.isSave = false;
        this.router.navigateByUrl('/usuarios/list');
      },
      error: () => {
        this.toastr.error('No se pudo guardar el usuario', 'Error!!');
        this.isSave = false;
      }
    })
  }

}
