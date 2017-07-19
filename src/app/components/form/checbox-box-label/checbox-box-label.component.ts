import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

import {ICheckBoxLabelItem} from '../../../interfaces/form/check-box-label-item.interface.';

@Component({
    selector: 'app-checbox-box-label',
    templateUrl: './checbox-box-label.component.html',
    styleUrls: ['./checbox-box-label.component.sass']
})
export class ChecboxBoxLabelComponent implements OnInit {
    @Input() classes: string = '';
    @Input() name: string = '';
    @Input() value: string = '';
    @Input() typeArray: boolean = false;
    @Input() items: Array<ICheckBoxLabelItem> = [];

    public inputValue = [];

    @Output()
    updateState: EventEmitter<object> = new EventEmitter<object>();

    constructor() {
    }

    ngOnInit() {
    }

    updateParent(item, event) {
        if (this.typeArray) {
            const check = this.inputValue.indexOf(item.id);
            if (event.target.checked === true) {
                if (check === -1) {
                    this.inputValue.push(item.id);
                }
            } else {
                if (check !== -1) {
                    this.inputValue.splice(check, 1);
                }
            }
        } else {
            this.inputValue = event.target.value;
        }

        this.updateState.emit({
            value: this.inputValue,
            field: this.name
        });
    }

}
