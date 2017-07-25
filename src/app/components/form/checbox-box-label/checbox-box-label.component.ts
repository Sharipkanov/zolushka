import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

import {ICheckBoxLabelItem} from '../../../interfaces/form/check-box-label-item.interface.';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

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
export class ChecboxBoxLabelComponent implements OnInit {
    @Input() classes: string = '';
    @Input() name: string = '';
    @Input() value: string = '';
    @Input() typeArray: boolean = false;
    @Input() items: Array<ICheckBoxLabelItem> = [];

    public inputValue: any;
    private propagateChange = (_: any) => {
    };

    constructor() {
        if (this.typeArray) {
            this.inputValue = [];
        } else {
            this.inputValue = '';
        }
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

    updateParent(item, event) {
        if (this.typeArray) {

            // console.log(item);
            this.items[item].checked = event.target.checked;

            this.inputValue = [];
            for (let i = 0; i < this.items.length; i++) {
                const forItem = this.items[i];
                if (forItem.checked) {
                    this.inputValue.push(forItem.id);
                }
            }
        } else {
            this.inputValue = event.target.value;
        }

        this.propagateChange(this.inputValue);
    }

}
