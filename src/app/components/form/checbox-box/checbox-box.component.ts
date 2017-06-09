import { Component, OnInit, Input } from '@angular/core';

interface CheckBoxItem {
  label: string,
  checked: boolean
}

@Component({
  selector: 'app-checbox-box',
  templateUrl: './checbox-box.component.html',
  styleUrls: ['./checbox-box.component.sass']
})
export class ChecboxBoxComponent implements OnInit {
  @Input() classes: string = '';
  @Input() name: string = '';
  @Input() items: Array<CheckBoxItem> = [];

  constructor() { }

  ngOnInit() {
  }

}
