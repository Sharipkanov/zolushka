import { Component, AfterViewInit, Input, ElementRef } from '@angular/core';

interface SelectSearchBoxItem {
  label: string,
  value: any,
  selected: boolean,
  text: string
}

@Component({
  selector: 'app-select-search-box',
  templateUrl: './select-search-box.component.html',
  styleUrls: ['./select-search-box.component.sass']
})

export class SelectSearchBoxComponent implements AfterViewInit {
  @Input() items: Array<SelectSearchBoxItem> = [];
  @Input() name: string = '';

  private selectSearchBox: Element;
  private selectSearchBoxActiveClassName = 'select-search-box--active';

  selectSearchBoxText: Array<string> = [];

  constructor(private _component: ElementRef) { }

  callSelect(e) {
    e.preventDefault();

    (this.selectSearchBox.classList.contains(this.selectSearchBoxActiveClassName))
      ? this.selectSearchBox.classList.remove(this.selectSearchBoxActiveClassName)
      : this.selectSearchBox.classList.add(this.selectSearchBoxActiveClassName);
  }

  clearSelect(e) {
    e.preventDefault();

    this.items.map((selectSearchBoxItem, selectSearchBoxIndex) => {
      selectSearchBoxItem.selected = false;
    });

    this.setSelectTexts();

    return this.selectSearchBox.classList.remove(this.selectSearchBoxActiveClassName);
  }

  markSelect(e, index) {
    e.preventDefault();

    this.items.map((selectSearchBoxItem, selectSearchBoxIndex) => {
      (selectSearchBoxIndex === index)
        ? selectSearchBoxItem.selected = !selectSearchBoxItem.selected
        : selectSearchBoxItem.selected = false;
    });

    this.selectSearchBox.classList.remove(this.selectSearchBoxActiveClassName);

    return this.setSelectTexts();
  }

  setSelectTexts() {
    this.selectSearchBoxText.splice(0, this.selectSearchBoxText.length);

    this.items.map((selectSearchBoxItem) => {
      if (selectSearchBoxItem.selected) {
        this.selectSearchBoxText.push(selectSearchBoxItem.label);
      }
    });

    if (this.selectSearchBoxText.length === 0) {
      this.selectSearchBoxText.push(this.items[0].label);
    }
  }

  ngAfterViewInit() {
    let selected = false;

    if (this.items.length) {
      for (let i = this.items.length; 0 < i;  --i) {
        const selectSearchBoxItem = this.items[i - 1];

        if (!selected && selectSearchBoxItem.selected && i !== 1) {
          selected = true;
        } else if (selected && i === 1) {
          selectSearchBoxItem.selected = false;
        }
      }

      this.setSelectTexts();
    }


    this.selectSearchBox = <Element>this._component.nativeElement.children[0];
  }

}
