import { Component, OnInit, Input,  } from '@angular/core';

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.sass']
})
export class InputBoxComponent implements OnInit {
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() classes: string = '';
  @Input() tooltip: string = '';
  @Input() name: string = '';
  @Input() type: string = 'text';

  constructor() { }

  ngOnInit() {
  }

}
