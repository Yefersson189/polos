import { Component } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  imports: [NgIf, RouterLink],
  templateUrl: './list-usuario.component.html',
  styleUrl: './list-usuario.component.css'
})
export class ListUsuarioComponent {
  usuarios: Usuario[] = [];
  isSave: boolean = false;

  constructor(private usuarioService: UsuarioService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    })
  }

  eliminarUsuario(id: number) {
    this.isSave = true;
    this.usuarioService.deleteUsuario(id).subscribe({
      next: () => {
        this.toastr.success('Usuario eliminado correctamente', 'Exito!!');
        this.isSave = false;
        this.getAllUsers();
      },
      error: () => {
        this.toastr.error('No se pudo eliminar el usuario', 'Error!!');
        this.isSave = false;
      }
    })

  }
}

