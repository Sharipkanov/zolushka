import { Component, OnInit, Input } from '@angular/core';

interface RadioBoxItem {
    label: string,
    checked: boolean
}

@Component({
  selector: 'app-radio-box',
  templateUrl: './radio-box.component.html',
  styleUrls: ['./radio-box.component.sass']
})
export class RadioBoxComponent implements OnInit {
  @Input() classes: string = '';
  @Input() name: string = '';
  @Input() items: Array<RadioBoxItem> = [];

  constructor() { }

  ngOnInit() {
  }

}
