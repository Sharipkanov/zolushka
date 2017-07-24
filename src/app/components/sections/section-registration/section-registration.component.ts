import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-section-registration',
  templateUrl: './section-registration.component.html',
  styleUrls: ['./section-registration.component.sass']
})
export class SectionRegistrationComponent implements OnInit {

  public FRegistration: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.FRegistration = this._fb.group({
      email: '',
      name: '',
      password: '',
      gender: '',
      cityId: '',
      type: '',
      day: '',
      month: '',
      year: '',
    })
  }

}
