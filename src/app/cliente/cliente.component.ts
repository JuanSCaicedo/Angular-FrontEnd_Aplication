import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  data!: Cliente[];
  current_clien!: Cliente;
  query!: string;
  crud_operation = { is_new: false, is_visible: false }

  currentPage = 1;
  totalPages = 0;
  totalItems = 0;

  constructor(private service: ClienteService) {
    this.current_clien = new Cliente();
  }

  ngOnInit() {
    this.loadPage(1);
  }

  loadPage(page: number) {
    this.service.read(this.query, page).subscribe(response => {
      // Asumiendo que el backend devuelve un objeto con esta estructura
      this.data = response.data;
      this.totalItems = response.total;
      this.currentPage = response.current_page;
      // Si el backend usa Laravel, estos datos vendrán en la respuesta
    });
  }

  // Método para manejar la búsqueda
  search() {
    this.currentPage = 1; // Reset a la primera página cuando se busca
    this.loadPage(1);
  }

  onSearchChange() {
    if (!this.query) {
      this.ngOnInit();
    }
  }

  new() {
    this.current_clien = new Cliente();
    this.crud_operation.is_visible = true;
    this.crud_operation.is_new = true;
  }

  save() {
    if (this.crud_operation.is_new) {
      this.service.insert(this.current_clien).subscribe(res => {
        this.current_clien = new Cliente();
        this.crud_operation.is_visible = false;
        this.ngOnInit();
      });
      return;
    }
    this.service.update(this.current_clien).subscribe(res => {
      this.current_clien = new Cliente();
      this.crud_operation.is_visible = false;
      this.ngOnInit();
    });
  }

  edit(row: any) {
    this.crud_operation.is_visible = true;
    this.crud_operation.is_new = false;
    this.current_clien = row;
  }

  delete(id: any) {
    this.service.delete(id).subscribe(res => {
      this.crud_operation.is_new = false;
      this.ngOnInit();
    });
  }
}
