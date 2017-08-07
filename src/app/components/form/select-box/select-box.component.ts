import {
    Component, AfterViewInit, Input, ElementRef, HostListener, ViewEncapsulation, OnInit,
    Output, EventEmitter, OnChanges, SimpleChange
} from '@angular/core';

import {ISelectBoxItem} from '../../../interfaces/form/select-box-item.interface';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'app-select-box',
    templateUrl: './select-box.component.html',
    styleUrls: ['./select-box.component.sass'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: SelectBoxComponent,
            multi: true
        }
    ]
})
export class SelectBoxComponent implements OnInit, AfterViewInit, OnChanges, ControlValueAccessor {
    @Input() items: Array<ISelectBoxItem> = [];
    @Input() multiple: boolean = false;
    @Input() iconClass: string = 'icon-form-triangle';
    @Input() classes: string = '';
    @Input() placeholder: string = 'Выбрать';

    private selectBox: HTMLElement;
    private selectBoxActiveClass: string = 'select-box--active';
    private selectBoxContentLeftClass: string = 'select-box__content--left';
    private selectBoxContentRightClass: string = 'select-box__content--right';
    private selectBoxContentTopClass: string = 'select-box__content--top';

    public selectBoxText: Array<string> = [];
    public selectBoxValues: Array<number> = [];

    public inputValue: any = null;
    private propagateChange = (_: any) => {
    };

    @HostListener('document:click', ['$event'])
    clickOutsideOfComponent(e) {
        if (!this._component.nativeElement.contains(e.target)) {
            if (!!this.selectBox) {
                this.selectBox.classList.remove(this.selectBoxActiveClass);
            }
        }
    }

    constructor(private _component: ElementRef) {
    }

    writeValue(value: any) {
        this.inputValue = value;
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched() {
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        let selectedFirst = true;


        if (this.inputValue !== undefined && this.inputValue !== null) {
            if (Object.prototype.toString.call(this.inputValue) === '[object Array]') {
                for (let i = 0; i < this.items.length; i++) {
                    const item = this.items[i];

                    for (let z = 0; z < this.inputValue.length; z++) {
                        const inputVal = this.inputValue[z];
                        if (inputVal.id === item.id) {
                            item.selected = true;
                            selectedFirst = false;
                        }
                    }
                }
            } else {
                for (let i = 0; i < this.items.length; i++) {
                    const item = this.items[i];

                    if (this.inputValue.id === item.id) {
                        item.selected = true;
                        selectedFirst = false;
                    }
                }
            }
        }


        /*this.items.unshift({
         id: '',
         text: this.placeholder,
         title: this.placeholder,
         selected: selectedFirst
         });*/

        this.setSelectTexts();
    }

    ngOnInit() {
        this.setSelectTexts();
    }

    ngAfterViewInit() {
    }

    selectCheckPosition() {
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

        this.selectCheckPosition();

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


                const selectVals = [];
                this.items.map(item => {
                    if (item.selected === true) {
                        selectVals.push(item);
                    }
                });

                if (!selectVals.length) {
                    this.items[0].selected = true;
                }

                this.propagateChange(selectVals);

            }
        } else {
            this.items.map((selectBoxItem: ISelectBoxItem, selectBoxIndex) => {
                if (selectBoxIndex === index) {
                    selectBoxItem.selected = true;

                    this.propagateChange(selectBoxItem);
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

        if (this.items) {
            return this.items.map((selectBoxItem: ISelectBoxItem) => {
                if (selectBoxItem.selected) {
                    this.selectBoxText.push(selectBoxItem.title);
                }
            });
        }
    }
}
