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
  @Input() clear: boolean = false;
  @Input() iconClass: string = '';

  private selectBox: HTMLElement;
  private selectBoxActiveClassName: string = 'select-box--active';

  selectBoxText: Array<string> = [];

  constructor(private _component: ElementRef) {

  }

  callSelect(e) {
    e.preventDefault();

    if (this.selectBox.classList.contains(this.selectBoxActiveClassName)) {
      this.selectBox.classList.remove(this.selectBoxActiveClassName);
    } else {
      const container: HTMLElement = <HTMLElement> this.selectBox.closest('.container');
      const selectBoxContent: HTMLElement = <HTMLElement> this.selectBox.getElementsByTagName('div')[0];

      const containerRect = container.getBoundingClientRect();
      const selectBoxContentRect = selectBoxContent.getBoundingClientRect();

      (containerRect.right <= ((selectBoxContentRect.width / .7) - selectBoxContentRect.width) + selectBoxContentRect.right)
        ? selectBoxContent.classList.add('inverse-right')
        : selectBoxContent.classList.remove('inverse-right');

      ((selectBoxContentRect.top + selectBoxContentRect.height) >= (window.outerHeight * .7))
        ? selectBoxContent.classList.add('inverse-top')
        : selectBoxContent.classList.remove('inverse-top');

      this.selectBox.classList.add(this.selectBoxActiveClassName);

      const selectBoxes = document.querySelectorAll('[data-select-box]');

      for (let i = 0; i < selectBoxes.length; i++) {
        const selectBox = selectBoxes[i];

        (!selectBox.isEqualNode(this.selectBox))
          ? selectBox.classList.remove(this.selectBoxActiveClassName)
          : selectBox.classList.add(this.selectBoxActiveClassName);
      }
    }

    return;
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

    this.selectBox = <HTMLElement>this._component.nativeElement.children[0];
  }

}
