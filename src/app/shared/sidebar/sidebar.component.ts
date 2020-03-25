import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/service.index';
import { Usuario } from "../../models/usuario.model";

import Swal from 'sweetalert2';


@Component( {
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
} )
export class SidebarComponent implements OnInit {
  
  usuario: Usuario;
  
  constructor( public _sideBar: SidebarService, public _usuarioServicio: UsuarioService ) {
  }
  
  ngOnInit() {
    this.usuario = this._usuarioServicio.usuario;
  }

  checkLogout() {
    Swal.fire( {
      title: 'Estas seguro de salir?',
      text: 'Va a abandonar la sesion actual, guarde todos los cambios antes del hacerlo.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, salir',
      cancelButtonText: 'No',
    } ).then( ( salir ) => {
      if( salir.value ) {
        this._usuarioServicio.logout();
        return;
      }
      console.log( 'dio en no' );
    } );
  }
  
}
