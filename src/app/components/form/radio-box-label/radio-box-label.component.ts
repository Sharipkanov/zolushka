import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

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
export class RadioBoxLabelComponent implements ControlValueAccessor, OnInit {
    @Input() classes: string = '';
    // @Input() name: string = '';
    @Input() items: Array<IRadioBoxLabelItem> = [];
    @Input() combined: boolean = false;
    @Input() combinedStyle: boolean = false;
    @Input() fullWidth: boolean = false;

    public inputValue: any;
    private propagateChange = (_: any) => {
    };

    constructor() {
    }

    ngOnInit() {
        setTimeout(() => {
            console.log(this.items)
        }, 2000)
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

    updateParent() {
        console.log(this.inputValue);
        this.propagateChange(this.inputValue);
    }

}
