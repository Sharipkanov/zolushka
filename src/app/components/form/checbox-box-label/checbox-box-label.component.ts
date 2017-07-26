import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';

import { ICheckBoxLabelItem } from '../../../interfaces/form/check-box-label-item.interface.';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-checbox-box-label',
    templateUrl: './checbox-box-label.component.html',
    styleUrls: ['./checbox-box-label.component.sass'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: ChecboxBoxLabelComponent,
            multi: true
        }
    ]

})
export class ChecboxBoxLabelComponent implements OnInit, OnChanges {
    @Input() classes: string = '';
    @Input() name: string = '';
    @Input() value: string = '';
    @Input() typeArray: boolean = false;
    @Input() items: Array<ICheckBoxLabelItem> = [];

    public inputValue: any = null;
    private propagateChange = (_: any) => {
    };

    constructor() {
    }

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

    ngOnInit() {
    }

    ngOnChanges() {
        if (!!this.items) {
            if (Object.prototype.toString.call(this.inputValue) === '[object Array]') {
                for (let i = 0; i < this.items.length; i++) {
                    const item = this.items[i];
                    for (let z = 0; z < this.inputValue.length; z++) {
                        const inputVal = this.inputValue[z];
                        if (inputVal.id === item.id) {
                            item.checked = true;
                        }
                    }
                }
            } else {
                for (let i = 0; i < this.items.length; i++) {
                    const item = this.items[i];

                    if (this.inputValue.id === item.id) {
                        item.checked = true;
                    }
                }
            }
        }
    }

    updateParent(item, event) {
        if (this.typeArray) {
            // console.log(item);
            this.items[item].checked = event.target.checked;

            this.inputValue = [];
            for (let i = 0; i < this.items.length; i++) {
                const forItem = this.items[i];
                if (forItem.checked) {
                    this.inputValue.push(forItem);
                }
            }
        } else {
            this.inputValue = item;
        }

        this.propagateChange(this.inputValue);
    }

}
