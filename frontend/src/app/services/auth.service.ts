import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Usuario } from '../models/Usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/polos_back/usuarios';

  private usuario?: Usuario;

  constructor(private http: HttpClient, private router: Router) { }

  autenticarse(nombreUsuario: string, clave: string): Observable<Usuario> {
    let params = new HttpParams().set("nombreUsuario", nombreUsuario).set("clave", clave);

    return this.http.get<Usuario>(`${this.apiUrl}/listUser`, { params: params })
      .pipe(tap(usuario => this.usuario = usuario), tap(usuario => localStorage.setItem('token', usuario.id.toString())),
      )
  }

  cerrarSesion(): void {
    this.usuario = undefined
    localStorage.clear()
    this.router.navigateByUrl("/login")
  }


}
