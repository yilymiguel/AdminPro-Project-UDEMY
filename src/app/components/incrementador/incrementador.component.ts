import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
    selector: 'app-incrementador',
    templateUrl: './incrementador.component.html',
    styles: []
})
export class IncrementadorComponent implements OnInit {

    @ViewChild('txtProgress', null) txtProgres: ElementRef;

    @Input('nombre') leyenda: string = 'Leyenda';
    @Input() progreso: number = 50;
    @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

    constructor() {
        // console.log('Leyenda', this.leyenda);
        // console.log('Progreso', this.progreso);
    }

    ngOnInit() {
        // console.log('Leyenda', this.leyenda);
        // console.log('Progreso', this.progreso);
    }

    onChangues(newValue: number) {

        // let elemtHTML: any = document.getElementsByName('progreso')[0];
        // console.log(this.txtProgres);
        if (newValue >= 100) {
            this.progreso = 100;
        } else if (newValue <= 0) {
            this.progreso = 0;
        } else {
            this.progreso = newValue;
        }

        // elemtHTML.value = this.progreso;
        this.txtProgres.nativeElement.value = this.progreso;
        this.cambioValor.emit(this.progreso);
    }

    cambiarValor(valor: number) {
        if (this.progreso >= 100 && valor > 0) {
            this.progreso = 100;
            return;
        }

        if (this.progreso <= 0 && valor < 0) {
            this.progreso = 0;
            return;
        }

        this.progreso += valor;

        this.cambioValor.emit(this.progreso);

        this.txtProgres.nativeElement.focus();
    }
}
