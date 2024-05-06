import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  data!: Cliente[];

  constructor(private http:HttpClient) { }

  read(query: string = '') {
    return this.http.get<any>('http://backen_aplication.juancaicedodevops.xyz/clientes', { params: { buscar: query } });
  }  

  insert(data: Cliente) {
    return this.http.post<any>('http://backen_aplication.juancaicedodevops.xyz/clientes', data);
  }

  update(data: Cliente) {
    return this.http.put<any>('http://backen_aplication.juancaicedodevops.xyz/clientes/' + data.id, data);
  }

  delete(id:number) {
    return this.http.delete<any>('http://backen_aplication.juancaicedodevops.xyz/clientes/' + id);
  }
}
