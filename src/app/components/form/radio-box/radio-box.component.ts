import { Component, OnInit, Input } from '@angular/core';

import { IRadioBoxItem } from '../../../interfaces/form/radio-box-item.interface';

@Component({
  selector: 'app-radio-box',
  templateUrl: './radio-box.component.html',
  styleUrls: ['./radio-box.component.sass']
})
export class RadioBoxComponent implements OnInit {
  @Input() classes: string = '';
  @Input() name: string = '';
  @Input() items: Array<IRadioBoxItem> = [];

  constructor() { }

  ngOnInit() {
  }

}
