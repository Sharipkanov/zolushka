import { Component, OnInit, Input } from '@angular/core';

interface CheckBoxLabelItem {
  label: string,
  checked: boolean
}

@Component({
  selector: 'app-checbox-box-label',
  templateUrl: './checbox-box-label.component.html',
  styleUrls: ['./checbox-box-label.component.sass']
})
export class ChecboxBoxLabelComponent implements OnInit {
  @Input() classes: string = '';
  @Input() name: string = '';
  @Input() items: Array<CheckBoxLabelItem> = [];

  constructor() { }

  ngOnInit() {
  }

}
