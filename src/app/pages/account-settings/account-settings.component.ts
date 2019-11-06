import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-account-settings',
    templateUrl: './account-settings.component.html',
    styles: []
})
export class AccountSettingsComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    cambiarColor(tema: string) {
        console.log(tema);
    }


}
