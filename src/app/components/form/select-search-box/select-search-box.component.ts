import {
    Component,
    AfterViewInit,
    OnChanges,
    Input,
    ElementRef,
    Output,
    EventEmitter,
    ViewEncapsulation,
    HostListener
} from '@angular/core';

import {ISelectSearchBoxItem} from '../../../interfaces/form/select-search-box-item.interface';
import {InputBoxComponent} from "../input-box/input-box.component";
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
    selector: 'app-select-search-box',
    templateUrl: './select-search-box.component.html',
    styleUrls: ['./select-search-box.component.sass'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: SelectSearchBoxComponent,
            multi: true
        }
    ]
})

export class SelectSearchBoxComponent implements AfterViewInit, OnChanges {
    @Input() items: Array<ISelectSearchBoxItem> = [];
    @Input() name: string = '';
    @Input() iconClass: string = '';
    @Input() placeholder: string = '';
    @Input() classes: string = '';
    @Output() search = new EventEmitter();

    public inputValue;
    public inputTimeout;
    public selectSearchBoxText: string = '';
    public filteredItems: Array<ISelectSearchBoxItem> = [];

    private selectSearchBox: Element;
    private selectSearchBoxActiveClass: string = 'select-search-box--active';
    private selectSearchBoxContentLeftClass: string = 'select-search-box__content--left';
    private selectSearchBoxContentRightClass: string = 'select-search-box__content--right';
    private selectSearchBoxContentTopClass: string = 'select-search-box__content--top';

    private propagateChange = (_: any) => {
    };

    @HostListener('document:click', ['$event'])
    clickOutsideOfComponent(e) {
        if (!this._component.nativeElement.contains(e.target)) {
            this.selectSearchBox.classList.remove(this.selectSearchBoxActiveClass);
        }
    }

    constructor(private _component: ElementRef) {
    }

    writeValue(value: any) {
        this.inputValue = value;
        this.detectChanges();
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched() {
    }

    ngAfterViewInit() {
        this.selectSearchBox = <Element>this._component.nativeElement.children[0];

        const container: HTMLElement = <HTMLElement> this.selectSearchBox.closest('.container');
        const selectSearchBoxContent: HTMLElement = <HTMLElement> this.selectSearchBox.getElementsByClassName('select-search-box__content')[0];

        const containerRect = container.getBoundingClientRect();
        const selectSearchBoxContentRect = selectSearchBoxContent.getBoundingClientRect();

        if (containerRect.right <= selectSearchBoxContentRect.right) {
            selectSearchBoxContent.classList.add(this.selectSearchBoxContentRightClass);
        }

        if (containerRect.left >= selectSearchBoxContentRect.left) {
            selectSearchBoxContent.classList.add(this.selectSearchBoxContentLeftClass);
        }

        if ((selectSearchBoxContentRect.top + selectSearchBoxContentRect.height) >= (window.outerHeight * .7)) {
            selectSearchBoxContent.classList.add(this.selectSearchBoxContentTopClass);
        }
    }

    detectChanges() {
        if (!!this.items.length) {
            for (let i = 0; i < this.items.length; i++) {
                if (!!this.inputValue && this.items[i].id === parseInt(this.inputValue.id, 0)) {
                    this.items[i].selected = true;
                    this.selectSearchBoxText = this.items[i].label;
                } else {
                    this.items[i].selected = false;
                }
            }
        }
    }

    ngOnChanges() {
        this.filteredItems = this.items;
        this.detectChanges();
    }

    selectSearchBoxEvent(e: Event) {
        e.preventDefault();

        return (!this.selectSearchBox.classList.contains(this.selectSearchBoxActiveClass))
            ? this.selectSearchBox.classList.add(this.selectSearchBoxActiveClass)
            : this.selectSearchBox.classList.remove(this.selectSearchBoxActiveClass);
    }

    selectSearch(e) {
        clearTimeout(this.inputTimeout);
        this.inputTimeout = setTimeout(() => {
            const input = e.target;

            // this.filteredItems = [];

            if (this.search.observers.length) {
                this.search.emit(input.value);
            } else {
                this.filteredItems = this.items.filter((selectSearchBoxItem: ISelectSearchBoxItem) => {
                    if (selectSearchBoxItem.label.toLowerCase().indexOf(input.value.toLowerCase()) > -1) {
                        return selectSearchBoxItem;
                    }
                });
            }
        }, 1000);
    }

    markSelect(e, index) {
        e.preventDefault();

        this.items.map((selectSearchBoxItem: ISelectSearchBoxItem, selectSearchBoxIndex: number) => {
            if (selectSearchBoxIndex === index) {
                this.selectSearchBoxText = selectSearchBoxItem.label;

                this.propagateChange(selectSearchBoxItem);
            }
        });

        return this.selectSearchBox.classList.remove(this.selectSearchBoxActiveClass);
    }
}
