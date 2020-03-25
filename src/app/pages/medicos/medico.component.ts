import { Component, OnInit } from '@angular/core';
import { HospitalService } from "../../services/hospital/hospital.service";
import { NgForm } from "@angular/forms";
import { Hospital } from "../../models/hospital.model";
import { Medico } from "../../models/medico.model";
import { MedicoService } from "../../services/medico/medico.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ModalUploadService } from "../../components/modal-upload/modal-upload.service";
import Swal from "sweetalert2";

@Component( {
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
} )
export class MedicoComponent implements OnInit {
  
  hospitales: Hospital[] = [];
  medico: Medico = new Medico( '', '', '', '', '' );
  hospital: Hospital = new Hospital( '' );
  
  constructor(
    public _hospitalService: HospitalService,
    public _medicoService: MedicoService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe( params => {
      let id = params[ 'id' ];
      
      if( id !== 'nuevo' ) {
        this.cargarMedico( id );
      }
    } )
  }
  
  ngOnInit() {
    this._hospitalService.cargarHospitales()
      .subscribe( hospitales => this.hospitales = hospitales );
    
    this._modalUploadService.notificacion
      .subscribe( resp => {
          // Mi solucion para el error del response cambie
          // this.medico.img = resp.medico.img; por  this.cargarMedico( this.medico._id )
          this.cargarMedico( this.medico._id );
          Swal.fire( 'Imagen actualizada', this.medico.nombre, 'success' );
          
          //Esto lo que hizo Fernando en Tuto---no pincha
          //   this.medico.img = resp.medico.img;
        }
      )
  }
  
  cargarMedico( id: string ) {
    this._medicoService.cargarMedico( id )
      .subscribe( medico => {
        console.log( medico );
        this.medico = medico;
        this.medico.hospital = medico.hospital._id;
        this.cambioHospital( this.medico.hospital );
      } );
  }
  
  guardarmedico( f: NgForm ) {
    console.log( f.valid );
    console.log( f.value );
    
    if( f.invalid ) {
      return;
    }
    
    this._medicoService.guardarMedico( this.medico )
      .subscribe( medico => {
        
        this.medico._id = medico._id;
        this.router.navigate( [ '/medico', medico._id ] );
      } )
  }
  
  
  cambioHospital( id: string ) {
    console.log( id );
    this._hospitalService.obtenerHospitales( id )
      .subscribe( hospital => this.hospital = hospital );
  }
  
  
  cambiarFoto() {
    this._modalUploadService.mostrarModal( 'medicos', this.medico._id );
  }
  
}
