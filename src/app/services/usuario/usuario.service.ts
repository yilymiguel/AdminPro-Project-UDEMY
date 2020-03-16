/* tslint:disable */
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { URL_SERVICIOS } from '../../config/config';

//Operator RXJS
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

//Sweetalert2
import Swal from 'sweetalert2';
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";

@Injectable( {
  providedIn: 'root'
} )
export class UsuarioService {
  
  usuario: Usuario;
  token: string;
  
  constructor(
    public http: HttpClient, public router: Router, public _subirArchivoService: SubirArchivoService ) {
    
    this.cargarStorage();
    console.log( 'Usuario con servicio listo.' );
  }
  
  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }
  
  cargarStorage() {
    if( localStorage.getItem( 'token' ) ) {
      this.token = localStorage.getItem( 'token' );
      this.usuario = JSON.parse( localStorage.getItem( 'usuario' ) );
    } else {
      this.token = '';
      this.usuario = null;
    }
  }
  
  guardarStorage( id: string, token: string, usuario: Usuario ) {
    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify( usuario ) );
    
    this.usuario = usuario;
    this.token = token;
  }
  
  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem( 'email' );
    localStorage.removeItem( 'usuario' );
    
    this.router.navigate( [ '/login' ] );
  }
  
  loginGoogle( token: string ) {
    const url = URL_SERVICIOS + '/login/google';
    return this.http.post( url, { token } ).pipe(
      map( ( resp: any ) => {
        this.guardarStorage( resp.id, resp.token, resp.usuario );
      } )
    )
  }
  
  loginUsuario( usuario: Usuario, recordar: boolean = false ) {
    
    if( recordar ) {
      localStorage.setItem( 'email', usuario.email );
    } else {
      localStorage.removeItem( 'email' );
    }
    
    let url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario ).pipe(
      map( ( resp: any ) => {
        this.guardarStorage( resp.id, resp.token, resp.usuario );
        return true;
      } )
    );
  }
  
  crearUsuario( usuario: Usuario ) {
    let url = URL_SERVICIOS + '/usuario';
    
    return this.http.post( url, usuario ).pipe(
      map( ( resp: any ) => {
        Swal.fire( 'Usuario Creado', usuario.email, 'success' );
        console.log( 'usuario creado correctamente' );
        return resp.usuario;
      } )
    );
  }
  
  actualizarUsuario( usuario: Usuario ) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    
    console.log( url );
    return this.http.put( url, usuario )
      .pipe(
        map( ( resp: any ) => {
          
          if( usuario._id === this.usuario._id ) {
            let usuarioDB: Usuario = resp.usuario;
            
            this.guardarStorage( usuarioDB._id, this.token, usuarioDB );
          }
          Swal.fire( 'Usuario actualizado', usuario.nombre, 'success' );
          return true;
        } )
      );
  }
  
  cambiarImagen( archivo: File, id: string ) {
    
    return this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
      .then( ( resp: any ) => {
        
        /** Hecho para que pinche el servicio sin error,
         * aun no descubro xq no funciona como dice el socio del curso */
        // Version Fernado Herrera
        // this.usuario.img = resp.usuario.img;
        
        // Version mia
        // this.usuario.img = resp.usuarioAct.img;
        
        Swal.fire( 'Imagen actualizada', this.usuario.nombre +
          ', en el proximo inicio de sesion se aplicara el' +
          ' cambio de imagen.', 'success' );
        
        this.guardarStorage( id, this.token, this.usuario );
        
      } )
      .catch( resp => {
        console.log( resp );
        Swal.fire( 'No se pudo actualizar', 'Error', 'error' );
      } );
  }
  
}
