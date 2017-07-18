import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { ICheckBoxLabelItem } from '../../../interfaces/form/check-box-label-item.interface.';

@Component({
  selector: 'app-checbox-box-label',
  templateUrl: './checbox-box-label.component.html',
  styleUrls: ['./checbox-box-label.component.sass']
})
export class ChecboxBoxLabelComponent implements OnInit {
  @Input() classes: string = '';
  @Input() name: string = '';
  @Input() value: string = '';
  @Input() items: Array<ICheckBoxLabelItem> = [];

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
