import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from './services/auth.service';
import { Usuario } from './models/Usuario';
import { UsuarioService } from './services/usuario.service';
import { filter, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';
import { CarritoService } from './services/carrito.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, NgIf, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  faShoppingCart = faShoppingCart;

  constructor(private authService: AuthService, 
    private usuarioService: UsuarioService, 
    private carritoService: CarritoService, 
    private toastr: ToastrService, 
    private router: Router,
    private cdr: ChangeDetectorRef) {
  }
  title = 'Polos Luciana';
  usuarioActual?: Usuario;
  isAuth: boolean = false;

  ngOnInit(): void {
    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe(() => {
      this.checkAuthStatus();
    });
 
    let id = localStorage.getItem('token');
    if (id) {
      this.isAuth = true;
      this.usuarioService.getUsuarioById(+id).subscribe({
        next: foundUsuario => {
          this.usuarioActual = foundUsuario;
          this.cdr.detectChanges();
        },
        error: () => {
          this.toastr.error('No se encontro el usuario', 'Error!!');
          this.router.navigateByUrl('/');
        }
      });
    }

  }

  checkAuthStatus(): void {
    const id = localStorage.getItem('token');
    this.isAuth = !!id;
  }

  getCantidad() {
    return this.carritoService.cantidad();
  }

  onLogout() {
    this.authService.cerrarSesion()
  }
}
