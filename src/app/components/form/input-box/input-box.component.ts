import {Component, OnInit, Input, ElementRef, ViewEncapsulation} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputBoxComponent,
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class InputBoxComponent implements OnInit {
  @Input() placeholder: string = '';
  @Input() classes: string = '';
  @Input() tooltip: string = '';
  @Input() type: string = 'text';
  @Input() error: boolean = false;

  public inputValue: any;
  private propagateChange = (_: any) => {
  };

  constructor(private _component: ElementRef) {
  }


  ngOnInit() {
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this.inputValue = value;
    }
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched() {
  }

  updateParent() {
    this.propagateChange(this.inputValue);
  }
}
