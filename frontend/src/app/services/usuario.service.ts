import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/polos_back/usuarios';

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
    return this.http.put(this.apiUrl, usuario);
  }

  deleteUsuario(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
