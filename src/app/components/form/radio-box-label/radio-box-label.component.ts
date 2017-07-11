import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { IRadioBoxLabelItem } from '../../../interfaces/form/radio-box-label-item.interface';

@Component({
  selector: 'app-radio-box-label',
  templateUrl: './radio-box-label.component.html',
  styleUrls: ['./radio-box-label.component.sass']
})
export class RadioBoxLabelComponent implements OnInit {
  @Input() classes: string = '';
  @Input() name: string = '';
  @Input() items: Array<IRadioBoxLabelItem> = [];
  @Input() combined: boolean = false;
  @Input() combinedStyle: boolean = false;
  @Input() fullWidth: boolean = false;

  @Output()
  updateState: EventEmitter<object> = new EventEmitter<object>();

  constructor() { }

  ngOnInit() {
  }

  updateParent(event) {
    this.updateState.emit({
      value: event.target.value,
      field: this.name
    });
  }

}
