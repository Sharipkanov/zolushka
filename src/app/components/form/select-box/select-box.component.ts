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
  private selectBoxActiveClassName = 'select-box--active';

  selectBoxText: Array<string> = [];

  constructor(private _component: ElementRef) {

  }

  documentClick() {
    return (e) => {
      if (e.target.closest('.select-box') === null) {
        return this.selectBox.classList.remove(this.selectBoxActiveClassName);
      }
    }
  }

  callSelect(e) {
    e.preventDefault();

    if (this.selectBox.classList.contains(this.selectBoxActiveClassName)) {
      this.selectBox.classList.remove(this.selectBoxActiveClassName);

      document.removeEventListener('click', this.documentClick(), false);
    } else {
      const container: HTMLElement = <HTMLElement> this.selectBox.closest('.container');
      const selectBoxContent: HTMLElement = <HTMLElement> this.selectBox.getElementsByTagName('div')[0];

      const containerRect = container.getBoundingClientRect();
      const selectBoxContentRect = selectBoxContent.getBoundingClientRect();

      if (containerRect.right <= ((selectBoxContentRect.width / .7) - selectBoxContentRect.width) + selectBoxContentRect.right) {
        selectBoxContent.style.left = 'initial';
        selectBoxContent.style.right = '0px';
      }

      if ((selectBoxContentRect.top + selectBoxContentRect.height) >= (window.outerHeight * .7)) {
        selectBoxContent.style.top = 'initial';
        selectBoxContent.style.bottom = 'calc(100% + 10px)';
      }

      this.selectBox.classList.add(this.selectBoxActiveClassName);

      document.addEventListener('click', this.documentClick(), false);
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
