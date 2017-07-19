import {Component, AfterViewInit, Input, ElementRef, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-textarea-box',
  templateUrl: './textarea-box.component.html',
  styleUrls: ['./textarea-box.component.sass']
})
export class TextareaBoxComponent implements AfterViewInit {
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() classes: string = '';
  @Input() tooltip: string = '';
  @Input() name: string = '';
  @Input() tooltip_message: string = '';

  @Output()
  updateState: EventEmitter<object> = new EventEmitter<object>();

  constructor(private _component: ElementRef) { }

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

  updateParent(event) {
    this.updateState.emit({
      value: event.target.value,
      field: this.name
    });
  }
}
