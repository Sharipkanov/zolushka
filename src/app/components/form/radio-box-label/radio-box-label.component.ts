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
        this.inputValue = value;

        this.detectChanges();
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    ngOnChanges() {
        this.detectChanges();
    }

    detectChanges() {
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];

            if (this.inputValue && item.id === this.inputValue.id) {
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
        console.log(this.items[itemIndex]);
        this.propagateChange(this.items[itemIndex]);
    }

}
