import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-section-registration-info',
    templateUrl: './section-registration-info.component.html',
    styleUrls: ['./section-registration-info.component.sass']
})
export class SectionRegistrationInfoComponent implements OnInit {

    user: object = {};

    constructor(private _http: Http) {
    }

    ngOnInit() {
    }

    userRegister(e: Event) {
        e.preventDefault();

        console.log(this.user);

        /*this.http.post('/api/auth/signup', { ...data }).subscribe(response => () => {

        })*/
    }

    updateState(event) {
        this.user[event.field] = event.value;
    }

}
