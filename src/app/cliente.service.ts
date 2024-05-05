import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  data!: Cliente[];

  constructor(private httpClient: HttpClient) { }

  read() {
    return this.httpClient.get<any>('http://localhost:8000/clientes');
  }

  insert(data: Cliente) {
    return this.httpClient.post<any>('http://localhost:8000/clientes', data);
  }

  update(data: Cliente) {
    return this.httpClient.put<any>('http://localhost:8000/clientes/' + data.id, data);
  }

  delete(id:number) {
    return this.httpClient.delete<any>('http://localhost:8000/clientes/' + id);
  }
}
