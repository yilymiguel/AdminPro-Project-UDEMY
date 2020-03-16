import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from "../config/config";

@Pipe( {
  name: 'imagen'
} )
export class ImagenPipe implements PipeTransform {
  
  /** esto se encarga de filtar en la vista los datos del usuario y todas las imagenes {{usuario.nombre}} o
  *  [src]="usuario.img | imagen".
  **/
  
  transform( img: string, tipo: string = 'usuarios' ): any {
    
    let url = URL_SERVICIOS + '/img';
    
    if( !img ) {
      return url + '/usuarios/yyy';
    }
    
    if( img.indexOf( 'http' ) >= 0 ) {
      return img;
    }
    
    switch( tipo ) {
      
      case 'usuarios':
        url += '/usuarios/' + img;
        break;
      
      case  'medicos':
        url += '/medicos/' + img;
        break;
      
      case 'hospitales':
        url += '/hospitales/' + img;
        break;
      
      default:
        console.log( 'Tipo de imagen no existe, usuarios, hospitales, medicos' );
        url += '/usuarios/yyy';
    }
    
    return url;
  }
  
}
