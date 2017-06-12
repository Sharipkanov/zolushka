import { Component, AfterViewInit, OnChanges, Input, ElementRef, Output, EventEmitter } from '@angular/core';

import { ISelectSearchBoxItem } from '../../../interfaces/form/select-search-box-item.interface';

@Component({
  selector: 'app-select-search-box',
  templateUrl: './select-search-box.component.html',
  styleUrls: ['./select-search-box.component.sass']
})

export class SelectSearchBoxComponent implements AfterViewInit, OnChanges {
  @Input() items: Array<ISelectSearchBoxItem> = [];
  @Input() name: string = '';
  @Input() iconClass: string = '';
  @Input() placeholder: string = '';
  @Output() search = new EventEmitter();

  public selectSearchBoxText: string = '';
  public filteredItems: Array<ISelectSearchBoxItem> = [];

  private selectSearchBox: Element;
  private selectSearchBoxActiveClassName: string = 'select-search-box--active';

  constructor(private _component: ElementRef) { }

  callSelect(e) {
    e.preventDefault();

    if (!this.selectSearchBox.classList.contains(this.selectSearchBoxActiveClassName)) {
      this.selectSearchBox.classList.add(this.selectSearchBoxActiveClassName);
    }
  }

  onKeyUp(e) {
    const input = e.target;

    this.filteredItems = [];

    if (this.search.observers.length) {
      this.search.emit(input.value);
    } else {
      this.filteredItems = this.items.filter(selectSearchBoxItem => {
        if (selectSearchBoxItem.label.toLowerCase().indexOf(input.value.toLowerCase()) > -1) {
          return selectSearchBoxItem;
        }
      });
    }
  }

  markSelect(e, index) {
    e.preventDefault();

    this.items.map((selectSearchBoxItem, selectSearchBoxIndex) => {
      if (selectSearchBoxIndex === index) {
        this.selectSearchBoxText = selectSearchBoxItem.label;
      }
    });

    return this.selectSearchBox.classList.remove(this.selectSearchBoxActiveClassName);
  }

  ngAfterViewInit() {
    this.selectSearchBox = <Element>this._component.nativeElement.children[0];
  }

  ngOnChanges() {
    this.filteredItems = this.items;
  }

}
