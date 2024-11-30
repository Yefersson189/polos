import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './services/auth.service';
import { Usuario } from './models/Usuario';
import { UsuarioService } from './services/usuario.service';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private authService: AuthService, private usuarioService: UsuarioService, private toastr: ToastrService, private router: Router) {
  }
  title = 'Polos Luciana';
  usuarioActual?: Usuario;
  isAuth: boolean = false;


  ngOnInit(): void {
    let id = localStorage.getItem('token');
    if (id) {
      this.isAuth = true;
      this.usuarioService.getUsuarioById(+id).subscribe({
        next: foundUsuario => {
          this.usuarioActual = foundUsuario
        },
        error: () => {
          this.toastr.error('No se encontro el usuario', 'Error!!');
          this.router.navigateByUrl('/');
        }
      });
    }

  }

  onLogout() {
    this.authService.cerrarSesion()
  }
}
