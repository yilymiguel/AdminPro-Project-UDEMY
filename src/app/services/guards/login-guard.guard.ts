import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from "../usuario/usuario.service";

@Injectable( {
  providedIn: 'root'
} )
export class LoginGuardGuard implements CanActivate {
  
  constructor( public _usuarioService: UsuarioService, public router: Router ) {
  
  }
  
  canActivate() {
    if( this._usuarioService.estaLogueado() ) {
      console.log( 'Paso el Guard' );
      return true;
    } else {
      console.log( 'Bloqueado por le Guard' );
      this.router.navigate( [ '/login' ] );
      return false;
    }
  }
  
}
