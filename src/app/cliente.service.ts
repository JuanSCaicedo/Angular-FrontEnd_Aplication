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
    return this.http.get<any>('http://localhost:8000/clientes', {
      params: {
        buscar: query,
        page: page.toString()
      }
    });
  }

  insert(data: Cliente) {
    return this.http.post<any>('http://localhost:8000/clientes', data);
  }

  update(data: Cliente) {
    return this.http.put<any>('http://localhost:8000/clientes/' + data.id, data);
  }

  delete(id:number) {
    return this.http.delete<any>('http://localhost:8000/clientes/' + id);
  }
}
