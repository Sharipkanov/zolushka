import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-popup-save-search',
  templateUrl: './popup-save-search.component.html',
  styleUrls: ['./popup-save-search.component.sass']
})
export class PopupSaveSearchComponent implements OnInit {

  public FSaveSearch: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.FSaveSearch = this._fb.group({
      searchName: ''
    })
  }

  saveSearch(e) {
    e.preventDefault();

    console.log(this.FSaveSearch.value);
  }

}
