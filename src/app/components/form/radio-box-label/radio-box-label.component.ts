import { Component, OnInit, Input } from '@angular/core';

interface Item {
  label: string,
  checked: boolean
}

@Component({
  selector: 'app-radio-box-label',
  templateUrl: './radio-box-label.component.html',
  styleUrls: ['./radio-box-label.component.sass']
})
export class RadioBoxLabelComponent implements OnInit {
  @Input() classes: string = '';
  @Input() name: string = '';
  @Input() items: Array<Item> = [];

  constructor() { }

  ngOnInit() {
  }

}
