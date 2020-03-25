/* tslint:disable */
import { Component, OnInit } from '@angular/core';
import { Hospital } from "../../models/hospital.model";
import { HospitalService } from "../../services/service.index";
import { ModalUploadService } from "../../components/modal-upload/modal-upload.service";
import Swal from "sweetalert2";


@Component( {
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
} )
export class HospitalesComponent implements OnInit {
  
  hospitales: Hospital[] = [];
  cargando: boolean = true;
  
  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) {
  }
  
  ngOnInit() {
    this.cargarHospitales();
    
    this._modalUploadService.notificacion
      .subscribe( resp => this.cargarHospitales() );
  }
  
  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales()
      .subscribe( hospitales => {
        this.hospitales = hospitales;
        this.cargando = false;
      } );
  }
  
  obtenerHospital( id: string ) {
    this.cargando = true;
    
    this._hospitalService.obtenerHospitales( id )
      .subscribe( ( hospitales: Hospital[] ) => {
        
        console.log( hospitales );
        this.hospitales = hospitales;
        this.cargando = false;
      } );
  }
  
  crearHospital( nombre: string ) {
    if( !nombre ) {
      Swal.fire( 'Error', 'Debe escribir un nombre', 'error' );
      return;
    }
    
    this._hospitalService.crearHospital( nombre )
      .subscribe( () => {
        Swal.fire( 'Hospital creado', 'Hospital: ' + nombre + ' creado correctamente.', 'success' );
        this.cargarHospitales();
      } );
  }
  
  
  guardarHospital( hospital: Hospital ) {
    this._hospitalService.actualizarHospital( hospital )
      .subscribe();
  }
  
  borrarHospital( hospital: Hospital ) {
    Swal.fire( {
      title: 'Esta seguro?',
      text: 'Esta a punto de borrar a: ' + hospital.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!'
    } ).then( ( borrar ) => {
      if( borrar.value ) {
        this._hospitalService.borrarHospital( hospital._id )
          .subscribe( borrado => {
            console.log( borrado );
            this.cargarHospitales();
          } )
      }
    } )
  }
  
  buscarHospital( termino: string ) {
    if( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }
    
    console.log( termino );
    this.cargando = true;
    
    this._hospitalService.buscarHospital( termino )
      .subscribe( ( hospitales: Hospital[] ) => {
        
        console.log( hospitales );
        this.hospitales = hospitales;
        this.cargando = false;
      } );
  }
  
  mostarModalHospital() {
  
  }
  
  mostarModal( id: string ) {
    this._modalUploadService.mostrarModal( 'hospitales', id );
  }
  
}
