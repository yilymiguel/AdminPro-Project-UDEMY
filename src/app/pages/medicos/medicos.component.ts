/* tslint:disable */

import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from '../../models/medico.model';
import { UsuarioService } from "../../services/usuario/usuario.service";
import Swal from "sweetalert2";
import { NgForm } from "@angular/forms";
import { Hospital } from "../../models/hospital.model";
import { HospitalService } from "../../services/hospital/hospital.service";

@Component( {
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
} )
export class MedicosComponent implements OnInit {
  
  medicos: Medico[] = [];
  cargando: boolean = true;
  desde: number = 0;
  
  
  
  constructor( public _medicoService: MedicoService,
               public _usuarioService: UsuarioService,
               ) {
  }
  
  ngOnInit() {
    
    this.cargarMedicos();
    
  }
  
  cargarMedicos() {
    
    this.cargando = true;
    this._medicoService.cargarMedicos( this.desde )
      .subscribe( medicos => {
        this.medicos = medicos;
        this.cargando = false;
      } )
  }
  
  buscarMedico( termino: string ) {
    
    if( termino.length <= 0 ) {
      this.cargarMedicos();
      return;
    }
    
    this.cargando = true;
    
    this._medicoService.buscarMedico( termino )
      .subscribe( ( medicos: Medico[] ) => {
        this.medicos = medicos;
        this.cargando = false;
      } )
    
  }
  
  borrarMedico( medico: Medico ) {
    
    Swal.fire( {
      title: 'Esta seguro?',
      text: 'Estas a punto de borrar a: ' + medico.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!'
    } ).then( ( borrar ) => {
      if( borrar.value ) {
        this._medicoService.borrarMedico( medico._id )
          .subscribe( borrado => {
            console.log( borrado );
            this.cargarMedicos();
          } )
      }
    } )
    
  }
  
  
  cambiarDesde( valor: number ) {
    let desde = this.desde + valor;
    
    if( desde >= this._medicoService.totalMedicos ) {
      return;
    }
    
    if( desde < 0 ) {
      return;
    }
    
    this.desde += valor;
    this.cargarMedicos();
  }
  
}
