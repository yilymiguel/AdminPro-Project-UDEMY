import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {
  constructor() {
    // this.regreseObservable().pipe(
    // 	retry(2)
    // 	)
    this.regreseObservable().subscribe(
      numero => console.log('Sub ', numero),
      error => console.error('Error en el obs ', error),
      () => console.log('El observador termino')
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    console.log('La web se va a cerrar!!!!!');
  }

  regreseObservable(): Observable<any> {
    return new Observable((observer: any) => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador++;

        const salida = {
          valor: contador
        };

        observer.next(salida);

        // if( contador === 3){
        // 	clearInterval(intervalo);
        // 	observer.complete();
        // }

        // if(contador === 2 ){
        // clearInterval(intervalo);
        // observer.error('Auxilio');
        // }
      }, 1000);
    });
    //   .pipe(
    //   map(resp => resp.values),
    //   filter((value, index) => {
    //     if (value % 2 == 1) {
    //       //impar
    //       return true;
    //     } else {
    //       //par
    //       return false;
    //     }
    //   })
    // );
  }

}
