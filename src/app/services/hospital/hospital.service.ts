/* tslint:disable */
import { Injectable } from '@angular/core';
import { Hospital } from "../../models/hospital.model";
import { HttpClient } from '@angular/common/http';

//Operator RXJS
import { map } from "rxjs/operators";

import { UsuarioService } from "../usuario/usuario.service";
import { URL_SERVICIOS } from '../../config/config';
import Swal from "sweetalert2";

@Injectable( {
  providedIn: 'root'
} )
export class HospitalService {
  
  hospital: Hospital;
  totalHospitales: number = 0;
  
  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) {
    console.log( 'Hospital con servicio listo.' );
  }
  
  
  cargarHospitales() {
    let url = URL_SERVICIOS + '/hospital';
    
    return this.http.get( url ).pipe(
      map( ( resp: any ) => {
        this.totalHospitales = resp.total;
        return resp.hospitales;
      } )
    );
  }
  
  obtenerHospitales( id: string ) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    
    return this.http.get( url ).pipe(
      map( ( resp: any ) => resp.hospital )
    );
  }
  
  crearHospital( nombre: string ) {
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;
    
    return this.http.post( url, { nombre: nombre } ).pipe(
      map( ( ( resp: any ) => resp.hospital )
      ) );
  }
  
  actualizarHospital( hospital: Hospital ) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;
    
    return this.http.put( url, hospital ).pipe(
      map( ( resp: any ) => {
        
        Swal.fire( 'Hospital actualizado', hospital.nombre, 'success' );
        return resp.hospital;
      } )
    );
  }
  
  borrarHospital( id: string ) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;
    
    return this.http.delete( url ).pipe(
      map( ( resp: any ) => {
        
        Swal.fire( 'Hospital Borrado', 'El hopital:' + resp.hospital.nombre + ' a sido eliminado correctamente', 'success' );
        
        return true;
      } )
    );
  }
  
  buscarHospital( termino: string ) {
    let url = URL_SERVICIOS + '/search/coleccion/hospitales/' + termino;
    
    return this.http.get( url ).pipe(
      map( ( resp: any ) => resp.hospitales )
    );
  }
  
}
