import { Injectable, EventEmitter } from '@angular/core';

@Injectable( {
  providedIn: 'root'
} )
export class ModalUploadService {
  
  public tipo: string;
  public id: string;
  
  public oculto: string = 'oculto';
  public notificacion = new EventEmitter<any>();
  
  constructor() {
    console.log( 'modal upload listo' )
  }
  
  ocultarModal() {
    this.oculto = 'oculto';
    this.id = null;
    this.tipo = null;
  }
  
  mostrarModal( tipo: string, id: string ) {
    this.oculto = '';
    this.id = id;
    this.tipo = tipo;
  }
}
