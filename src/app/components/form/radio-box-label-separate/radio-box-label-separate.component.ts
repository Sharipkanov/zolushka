import { Component, OnInit, Input } from '@angular/core';

import { IRadioBoxLabelSeparateItem } from '../../../interfaces/form/radio-box-label-separate-item.interface';

@Component({
  selector: 'app-radio-box-label-separate',
  templateUrl: './radio-box-label-separate.component.html',
  styleUrls: ['./radio-box-label-separate.component.sass']
})
export class RadioBoxLabelSeparateComponent implements OnInit {
  @Input() classes: string = '';
  @Input() name: string = '';
  @Input() items: Array<IRadioBoxLabelSeparateItem> = [];

  constructor() { }

  ngOnInit() {
  }

}
