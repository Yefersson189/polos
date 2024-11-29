import { Component } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [NgIf],
  templateUrl: './list-usuario.component.html',
  styleUrl: './list-usuario.component.css'
})
export class ListUsuarioComponent {
  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void { }

  getAllProducts() {
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    })
  }

}
