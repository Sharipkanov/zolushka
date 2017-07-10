import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormControl } from "@angular/forms";

@Component({
    selector: 'app-section-registration-info',
    templateUrl: './section-registration-info.component.html',
    styleUrls: ['./section-registration-info.component.sass']
})
export class SectionRegistrationInfoComponent implements OnInit {

    constructor(private http: Http) {
    }

    ngOnInit() {
    }

    onSubmit(e, form) {
        e.preventDefault();

        const data = {
            name: new FormControl('name'),
            email: new FormControl('email'),
        };

        console.log(form.value);

        /*this.http.post('/api/auth/signup', { ...data }).subscribe(response => () => {

        })*/
    }

}
