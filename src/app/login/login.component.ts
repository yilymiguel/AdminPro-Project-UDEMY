import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from "../services/service.index";
import { Usuario } from "../models/usuario.model";

declare function init_plugins();

declare const gpai: any;

@Component( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ],
} )
export class LoginComponent implements OnInit {
  
  recuerdame: boolean = false;
  email: string;
  auth2: any;
  
  constructor( public router: Router, public _usuarioService: UsuarioService ) {
  }
  
  ngOnInit() {
    init_plugins();
    
    this.email = localStorage.getItem( 'email' ) || '';
    
    if( this.email.length > 0 ) {
      this.recuerdame = true;
    }
  }
  
  googleInit() {
    // @ts-ignore
    gapi.load( 'ath2', () => {
      // @ts-ignore
      this.auth2 = gapi.auth2.init( {
        client_id: '442737206823-dilej5tevnrv61sovd7bocf5qeafmjs3.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      } );
      this.attachSignin( document.getElementById( 'btnGoogle' ) );
    } );
  }
  
  attachSignin( element ) {
    this.auth2.attachClickHandler( element, {}, ( googleUser ) => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      
      this._usuarioService.loginGoogle( token )
        .subscribe( () => window.location.href = '#/dashboard' );
    } )
  }
  
  ingresar( forma: NgForm ) {
    
    if( forma.invalid ) {
      return;
    }
    
    let usuario = new Usuario( null, forma.value.email, forma.value.password );
    
    this._usuarioService.loginUsuario( usuario, forma.value.recuerdame )
      .subscribe( correcto => this.router.navigate( [ '/dashboard' ] ) );
  }
  
}
