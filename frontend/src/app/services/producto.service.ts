import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://3.145.103.40/polos_back/productos';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  getProductoById(id: number): Observable<Producto> {
    let params = new HttpParams().set("id", id);
    return this.http.get<Producto>(`${this.apiUrl}/listid`, { params: params });
  }

  createProducto(formData: FormData): Observable<Producto> {
    return this.http.post<Producto>(`${this.apiUrl}/add`, formData);
  }

  updateProducto(formData: FormData) {
    return this.http.put(`${this.apiUrl}/edit`, formData);
  }

  deleteProducto(id: number) {
    let params = new HttpParams().set("id", id);
    return this.http.delete(`${this.apiUrl}/delete`, { params: params });
  }
}
