import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://3.145.103.40/polos_back/usuarios';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  getUsuarioById(id: number): Observable<Usuario> {
    let params = new HttpParams().set("id", id);
    return this.http.get<Usuario>(`${this.apiUrl}/listid`, { params: params });
  }

  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/add`, usuario);
  }

  updateUsuario(usuario: Usuario) {
    return this.http.put(`${this.apiUrl}/edit`, usuario);
  }

  deleteUsuario(id: number) {
    let params = new HttpParams().set("id", id);
    return this.http.delete(`${this.apiUrl}/delete`, { params: params });
  }

}
