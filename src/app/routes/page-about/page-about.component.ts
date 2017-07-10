import { Component, OnInit } from '@angular/core';

interface SelectSearchBoxItem {
  label: string,
  labelInfo: string
}

@Component({
  selector: 'app-page-about',
  templateUrl: './page-about.component.html',
  styleUrls: ['./page-about.component.sass']
})
export class PageAboutComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
