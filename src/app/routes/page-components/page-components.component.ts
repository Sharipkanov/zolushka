import { Component, OnInit } from '@angular/core';

interface SelectSearchBoxItem {
  label: string,
  labelInfo: string
}

@Component({
  selector: 'app-page-components',
  templateUrl: './page-components.component.html',
  styleUrls: ['./page-components.component.sass']
})
export class PageComponentsComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
