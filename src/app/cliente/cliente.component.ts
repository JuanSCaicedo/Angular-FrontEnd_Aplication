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
  crud_operation = { is_new: false, is_visible: false }

  constructor(private service: ClienteService) {
    this.data = [];
  }

  ngOnInit() {
    this.service.read().subscribe(res => {
      this.data = res;
      this.current_clien = new Cliente();
    });
  }

  new() {
    this.current_clien = new Cliente();
    this.crud_operation.is_visible = true;
    this.crud_operation.is_new = true;
  }

  save() {
    if (this.crud_operation.is_new) {
      this.service.insert(this.current_clien).subscribe(res => {
        this.current_clien = new Cliente(); // Limpiar el formulario
        this.crud_operation.is_visible = false;
        this.ngOnInit(); // Recargar los datos después de la inserción
      }, error => {
        console.error("Error al insertar el cliente:", error);
      });
    } else {
      this.service.update(this.current_clien).subscribe(res => {
        this.current_clien = new Cliente(); // Limpiar el formulario
        this.crud_operation.is_visible = false;
        this.ngOnInit(); // Recargar los datos después de la actualización
      }, error => {
        console.error("Error al actualizar el cliente:", error);
      });
    }
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
