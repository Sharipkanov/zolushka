import {Component, AfterViewInit, Input, ElementRef, Output, EventEmitter} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-textarea-box',
  templateUrl: './textarea-box.component.html',
  styleUrls: ['./textarea-box.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextareaBoxComponent,
      multi: true
    }
  ]
})
export class TextareaBoxComponent implements AfterViewInit {
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() classes: string = '';
  @Input() tooltip: string = '';
  @Input() name: string = '';
  @Input() tooltip_message: string = '';

  public inputValue: any;
  private propagateChange = (_: any) => { };

  constructor(private _component: ElementRef) { }

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

  ngAfterViewInit() {
    if (this.tooltip.length) {
      const componentElement = this._component.nativeElement.children[0];
      const textareaElement = componentElement.getElementsByTagName('textarea')[0];
      const textareaCounterElement = componentElement.getElementsByClassName('textarea-box__count')[0];
      let textareaCount = textareaElement.value.length;

      textareaCounterElement.innerHTML = textareaCount;

      textareaElement.addEventListener('keyup', (e) => {
          textareaCount = textareaElement.value.length;

          textareaCounterElement.innerHTML = textareaCount;

        (textareaCount > parseInt(this.tooltip, 10))
          ? componentElement.classList.add('textarea-box--danger')
          : componentElement.classList.remove('textarea-box--danger');
      });
    }
  }

  updateParent() {
    this.propagateChange(this.inputValue);
  }
}
