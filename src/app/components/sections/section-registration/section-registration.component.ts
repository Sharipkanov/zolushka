import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-section-registration',
  templateUrl: './section-registration.component.html',
  styleUrls: ['./section-registration.component.sass']
})
export class SectionRegistrationComponent implements OnInit {

  public FRegistration = new FormGroup({
    email: new FormControl(''),
    name: new FormControl(''),
    password: new FormControl(''),
    cityId: new FormControl(''),
    type: new FormControl(''),
    day: new FormControl(''),
    month: new FormControl(''),
    year: new FormControl(''),
  });

  constructor() { }

  ngOnInit() {
  }

}
