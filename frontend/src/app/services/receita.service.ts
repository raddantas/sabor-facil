import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Receita } from '../models/receita';
import { environment } from '../../environments/environment';
import { aprovarDemo, buscarDemo, cadastrarDemo, listarDemo, recusarDemo } from './receita-demo';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {
  private http = inject(HttpClient);
  private apiUrl = '/api/receitas';

  // true só na versão do GitHub Pages
  private demo = environment.demo;

  listarAprovadas(categoria = ''): Observable<Receita[]> {
    if (this.demo) {
      return of(listarDemo('aprovada', categoria));
    }
    let params = new HttpParams().set('status', 'aprovada');
    if (categoria) {
      params = params.set('categoria', categoria);
    }
    return this.http.get<Receita[]>(this.apiUrl, { params });
  }

  listarPendentes(): Observable<Receita[]> {
    if (this.demo) {
      return of(listarDemo('pendente'));
    }
    const params = new HttpParams().set('status', 'pendente');
    return this.http.get<Receita[]>(this.apiUrl, { params });
  }

  pesquisarPorNome(nome: string): Observable<Receita[]> {
    if (this.demo) {
      return of(listarDemo('aprovada', '', nome));
    }
    const params = new HttpParams().set('status', 'aprovada').set('nome', nome);
    return this.http.get<Receita[]>(this.apiUrl, { params });
  }

  buscarPorId(id: number): Observable<Receita> {
    if (this.demo) {
      const receita = buscarDemo(id);
      return receita ? of(receita) : this.naoEncontrada();
    }
    return this.http.get<Receita>(`${this.apiUrl}/${id}`);
  }

  cadastrar(receita: Receita): Observable<Receita> {
    if (this.demo) {
      return of(cadastrarDemo(receita));
    }
    return this.http.post<Receita>(this.apiUrl, receita);
  }

  aprovar(id: number): Observable<Receita> {
    if (this.demo) {
      const receita = aprovarDemo(id);
      return receita ? of(receita) : this.naoEncontrada();
    }
    return this.http.patch<Receita>(`${this.apiUrl}/${id}/aprovar`, {});
  }

  recusar(id: number): Observable<void> {
    if (this.demo) {
      return recusarDemo(id) ? of(undefined) : this.naoEncontrada();
    }
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private naoEncontrada(): Observable<never> {
    return throwError(() => new HttpErrorResponse({ status: 404, statusText: 'Not Found' }));
  }
}
