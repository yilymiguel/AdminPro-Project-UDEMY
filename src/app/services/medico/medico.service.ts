/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Operator RXJS
import { map } from 'rxjs/operators';

import { Medico } from '../../models/medico.model';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from "sweetalert2";


@Injectable( {
  providedIn: 'root'
} )
export class MedicoService {
  
  medico: Medico;
  totalMedicos: number = 0;
  
  constructor( public http: HttpClient, public _usuarioService: UsuarioService ) {
    console.log( 'Medico con servicio listo' );
  }
  
  cargarMedicos( desde: number ) {
    let url = URL_SERVICIOS + '/medico?desde=' + desde;
    
    return this.http.get( url ).pipe(
      map( ( resp: any ) => {
        this.totalMedicos = resp.total;
        return resp.medicos;
      } )
    )
  }
  
  cargarMedico( id: string ) {
    let url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get( url ).pipe(
      map( ( resp: any ) => resp.medico )
    )
  }
  
  buscarMedico( termino: string ) {
    let url = URL_SERVICIOS + '/search/coleccion/medicos/' + termino;
    
    return this.http.get( url ).pipe(
      map( ( resp: any ) => resp.medicos )
    );
  }
  
  borrarMedico( id: string ) {
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;
    
    return this.http.delete( url ).pipe(
      map( ( resp: any ) => {
        Swal.fire( 'Medico borrado', 'El medico: ' + resp.medico.nombre + ' a sido eliminado correctamente' );
        return true;
      } )
    );
  }
  
  guardarMedico( medico: Medico ) {
    let url = URL_SERVICIOS + '/medico';
    
    if( medico._id ) {
      //actualizar
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put( url, medico ).pipe(
        map( ( resp: any) => {
          Swal.fire( 'Medico actualizado', medico.nombre, 'success' );
          return resp.medico;
        } )
      )
      
    } else {
      //crear
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, medico ).pipe(
        map( ( resp: any ) => {
          
          Swal.fire( 'Medico creado', medico.nombre, 'success' );
          return resp.medico;
        } )
      );
    }
  }
  
}
