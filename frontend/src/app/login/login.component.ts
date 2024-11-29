import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formLogin!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router) {
    this.formLogin = this.fb.group({
      nombreUsuario: ['', Validators.required],
      clave: ['', Validators.required]
    })
  }

  onLogin() {
    if (this.formLogin.invalid) {
      this.toastr.error('Revise los campos e intente nuevamente', 'Error!!');
      return;
    }
    this.authService.autenticarse(this.formLogin.controls['nombreUsuario'].value, this.formLogin.controls['clave'].value).subscribe({
      next: () => {
        this.toastr.success('Login exitoso', 'Exito!!');
        this.router.navigateByUrl('/productos/list');
      },
      error: () => {
        this.toastr.error('Usuario y/o contraseña incorrecta', 'Error!!');
      }
    })
  }



}
