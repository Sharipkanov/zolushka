import {
    Component, AfterViewInit, Input, ElementRef, HostListener, ViewEncapsulation, OnInit,
    Output, EventEmitter, OnChanges, SimpleChange
} from '@angular/core';

import { ISelectBoxItem } from '../../../interfaces/form/select-box-item.interface';

@Component({
    selector: 'app-select-box',
    templateUrl: './select-box.component.html',
    styleUrls: ['./select-box.component.sass'],
    encapsulation: ViewEncapsulation.None
})
export class SelectBoxComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() items: Array<ISelectBoxItem> = [];
    @Input() name: string = '';
    @Input() multiple: boolean = false;
    @Input() iconClass: string = '';
    @Input() classes: string = '';

    @Output()
    updateState: EventEmitter<object> = new EventEmitter<object>();

    private selectBox: HTMLElement;
    private selectBoxActiveClass: string = 'select-box--active';
    private selectBoxContentLeftClass: string = 'select-box__content--left';
    private selectBoxContentRightClass: string = 'select-box__content--right';
    private selectBoxContentTopClass: string = 'select-box__content--top';

    public selectBoxText: Array<string> = [];
    public selectBoxValues: Array<number> = [];

    @HostListener('document:click', ['$event'])
    clickOutsideOfComponent(e) {
        if (!this._component.nativeElement.contains(e.target)) {
            this.selectBox.classList.remove(this.selectBoxActiveClass);
        }
    }

    constructor(private _component: ElementRef) {

    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        this.setSelectTexts();
    }

    ngOnInit() {
        this.setSelectTexts();
    }

    ngAfterViewInit() {
        this.selectBox = <HTMLElement>this._component.nativeElement.children[0];

        const container: HTMLElement = <HTMLElement> this.selectBox.closest('.container');
        const selectBoxContent: HTMLElement = <HTMLElement> this.selectBox.getElementsByClassName('select-box__content')[0];

        const containerRect = container.getBoundingClientRect();
        const selectBoxContentRect = selectBoxContent.getBoundingClientRect();

        if (containerRect.right <= selectBoxContentRect.right) {
            selectBoxContent.classList.add(this.selectBoxContentRightClass);
        }

        if (containerRect.left >= selectBoxContentRect.left) {
            selectBoxContent.classList.add(this.selectBoxContentLeftClass);
        }

        if ((selectBoxContentRect.top + selectBoxContentRect.height) >= (window.outerHeight * .7)) {
            selectBoxContent.classList.add(this.selectBoxContentTopClass);
        }
    }

    selectEvent(e: Event) {
        e.preventDefault();

        return (!this.selectBox.classList.contains(this.selectBoxActiveClass))
            ? this.selectBox.classList.add(this.selectBoxActiveClass)
            : this.selectBox.classList.remove(this.selectBoxActiveClass);
    }

    markSelect(e: Event, index: number) {
        e.preventDefault();

        if (this.multiple) {
            if (index === 0) {
                this.items.map((selectBoxItem: ISelectBoxItem, selectBoxIndex) => {
                    (selectBoxIndex === index) ? selectBoxItem.selected = true : selectBoxItem.selected = false;
                });

                this.selectBox.classList.remove(this.selectBoxActiveClass);
            } else {
                this.items[index].selected = !this.items[index].selected;
                this.items[0].selected = false;
            }
        } else {
            this.items.map((selectBoxItem: ISelectBoxItem, selectBoxIndex) => {
                if (selectBoxIndex === index) {
                    selectBoxItem.selected = true;

                    this.updateState.emit({
                        value: selectBoxItem.value,
                        field: this.name
                    });
                } else {
                    selectBoxItem.selected = false;
                }

            });

            this.selectBox.classList.remove(this.selectBoxActiveClass);
        }

        return this.setSelectTexts();
    }

    setSelectTexts() {
        this.selectBoxText = [];
        this.selectBoxValues = [];

        if (this.items) {
            return this.items.map((selectBoxItem: ISelectBoxItem) => {
                if (selectBoxItem.selected) {
                    this.selectBoxValues.push(selectBoxItem.value);
                    this.selectBoxText.push(selectBoxItem.label);
                }
            });
        }
    }

}
