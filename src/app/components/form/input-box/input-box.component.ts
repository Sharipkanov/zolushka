import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'app-input-box',
    templateUrl: './input-box.component.html',
    styleUrls: ['./input-box.component.sass'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: InputBoxComponent,
            multi: true
        }
    ]
})
export class InputBoxComponent implements OnInit {
    @Input() placeholder: string = '';
    // @Input() value: string = '';
    @Input() classes: string = '';
    @Input() tooltip: string = '';
    // @Input() name: string = '';
    @Input() type: string = 'text';
    @Input() error: boolean = false;


    @Output()
    updateState: EventEmitter<object> = new EventEmitter<object>();

    public inputValue: any;
    private propagateChange = (_: any) => { };

    constructor() {
    }


    ngOnInit() {
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
        this.propagateChange(this.inputValue);
    }
}
