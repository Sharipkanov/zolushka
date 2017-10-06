import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-radio-box',
    templateUrl: './radio-box.component.html',
    styleUrls: ['./radio-box.component.sass'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RadioBoxComponent,
            multi: true
        }
    ]
})
export class RadioBoxComponent implements OnInit, OnChanges, ControlValueAccessor {
    @Input() classes: string = '';
    @Input() name: string = '';
    @Input() items: Array<any> = [];
    @Input() titleName: string = 'title';

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
        if (!!this.items) {
            for (let i = 0; i < this.items.length; i++) {
                const item = this.items[i];

                if (!!this.inputValue && item.id === this.inputValue.id) {
                    item.checked = true;
                }
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
