import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  data!: Cliente[];

  constructor(private http:HttpClient) { }

  read(query: string = '', page: number = 1) {
    return this.http.get<any>('https://backend-laravel.juandevops.com/clientes', {
      params: {
        buscar: query,
        page: page.toString()
      }
    });
  }

  insert(data: Cliente) {
    return this.http.post<any>('https://backend-laravel.juandevops.com/clientes', data);
  }

  update(data: Cliente) {
    return this.http.put<any>('https://backend-laravel.juandevops.com/clientes/' + data.id, data);
  }

  delete(id:number) {
    return this.http.delete<any>('https://backend-laravel.juandevops.com/clientes/' + id);
  }
}
