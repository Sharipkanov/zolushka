import {Component, OnInit, Input, EventEmitter, Output, OnChanges} from '@angular/core';

import {IRadioBoxLabelItem} from '../../../interfaces/form/radio-box-label-item.interface';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'app-radio-box-label',
    templateUrl: './radio-box-label.component.html',
    styleUrls: ['./radio-box-label.component.sass'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RadioBoxLabelComponent,
            multi: true
        }
    ]
})
export class RadioBoxLabelComponent implements ControlValueAccessor, OnInit, OnChanges {
    @Input() classes: string = '';
    @Input() items: Array<IRadioBoxLabelItem> = [];
    @Input() combined: boolean = false;
    @Input() combinedStyle: boolean = false;
    @Input() fullWidth: boolean = false;

    public inputValue: any = null;
    private propagateChange = (_: any) => {
    };

    constructor() {
    }

    ngOnInit() {
    }

    writeValue(value: any) {
        if (!!value) {
            this.inputValue = value.id;
        }
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    ngOnChanges() {
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];

            if (item.id === this.inputValue) {
                item.checked = true;
            }
        }
    }

    registerOnTouched() {
    }

    updateParent(itemIndex) {
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];

            (i !== itemIndex) ? item.checked = false : item.checked = true;
        }
        this.propagateChange(this.items[itemIndex]);
    }

}
