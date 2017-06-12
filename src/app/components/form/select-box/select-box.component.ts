import { Component, AfterViewInit, Input, ElementRef } from '@angular/core';

import { ISelectBoxItem } from '../../../interfaces/form/select-box-item.interface';

@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.sass']
})
export class SelectBoxComponent implements AfterViewInit {
  @Input() items: Array<ISelectBoxItem> = [];
  @Input() name: string = '';
  @Input() multiple: boolean = false;
  @Input() iconClass: string = '';

  private selectBox: Element;
  private selectBoxActiveClassName = 'select-box--active';

  selectBoxText: Array<string> = [];

  constructor(private _component: ElementRef) {

  }

  callSelect(e) {
    e.preventDefault();

    (this.selectBox.classList.contains(this.selectBoxActiveClassName))
      ? this.selectBox.classList.remove(this.selectBoxActiveClassName)
      : this.selectBox.classList.add(this.selectBoxActiveClassName);
  }

  clearSelect(e) {
    e.preventDefault();

    this.items.map(selectBoxItem =>  selectBoxItem.selected = false);

    this.setSelectTexts();

    return this.selectBox.classList.remove(this.selectBoxActiveClassName);
  }

  markSelect(e, index) {
    e.preventDefault();

    if (!this.multiple) {
        this.items.map((selectBoxItem, selectBoxIndex) => {
          (selectBoxIndex === index) ? selectBoxItem.selected = !selectBoxItem.selected : selectBoxItem.selected = false;
        });

        this.selectBox.classList.remove(this.selectBoxActiveClassName);
    } else {
      this.items.map((selectBoxItem, selectBoxIndex) => {
        if (selectBoxIndex === index) {
          selectBoxItem.selected = !selectBoxItem.selected;
        }
      });
    }

    return this.setSelectTexts();
  }

  setSelectTexts() {
    this.selectBoxText.splice(0, this.selectBoxText.length);

    this.items.map((selectBoxItem) => {
      if (selectBoxItem.selected) {
        this.selectBoxText.push(selectBoxItem.label);
      }
    });

    if (this.selectBoxText.length === 0) {
      this.selectBoxText.push(this.items[0].label);
    } else {
      if (this.multiple && this.selectBoxText[0] === this.items[0].label && this.selectBoxText.length > 1) {
        this.selectBoxText.shift();
      }
    }
  }

  ngAfterViewInit() {
    let selected = false;

    if (this.items.length) {
      this.items.map((item, itemIndex) => {
        if (!this.multiple) {
          if (!selected && item.selected) {
            selected = true;
          } else if (selected && item.selected) {
            item.selected = !item.selected;
          }
        } else {
          if (!selected && item.selected && itemIndex !== 1) {
            selected = true;
          } else if (selected && itemIndex === 1) {
            item.selected = false;
          }
        }
      });

      this.setSelectTexts();
    }

    this.selectBox = <Element>this._component.nativeElement.children[0];
  }

}
