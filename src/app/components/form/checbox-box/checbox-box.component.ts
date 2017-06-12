import { Component, OnInit, Input } from '@angular/core';

import { ICheckBoxItem } from '../../../interfaces/form/check-box-item.interface';

@Component({
  selector: 'app-checbox-box',
  templateUrl: './checbox-box.component.html',
  styleUrls: ['./checbox-box.component.sass']
})
export class ChecboxBoxComponent implements OnInit {
  @Input() classes: string = '';
  @Input() name: string = '';
  @Input() items: Array<ICheckBoxItem> = [];

  constructor() { }

  ngOnInit() {
  }

}
