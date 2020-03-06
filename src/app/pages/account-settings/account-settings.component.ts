import { Component, OnInit, Inject } from '@angular/core';

import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(public _ajustes: SettingsService) {
  }

  ngOnInit() {
    this.checked();
  }

  cambiarColor(tema: string, link: any) {

    this.aplicarCheck(link);

    this._ajustes.aplicarTema(tema);


  }

  aplicarCheck(link: any) {
    let selectores: any = document.getElementsByClassName('selector');

    for (let ref of selectores) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  checked() {
    let selectores: any = document.getElementsByClassName('selector');
    let tema = this._ajustes.ajustes.tema;

    for (let ref of selectores) {
      if (tema == ref.getAttribute('data-theme')) {
        ref.classList.add('working');
        break;
      }
    }
  }


}
