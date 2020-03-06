import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-grafico-dona',
    templateUrl: './grafico-dona.component.html',
    styles: []
})
export class GraficoDonaComponent{


    @Input('chartLabels') doughnutChartLabels: string[] = [];
    @Input('chartData') doughnutChartData: number[] = [];
    @Input('chartType') doughnutChartType: string = '';

    constructor() {
    }

    // private ngOnInit() {
    // }
}
