import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';

@Component({
    selector: 'app-input-box',
    templateUrl: './input-box.component.html',
    styleUrls: ['./input-box.component.sass']
})
export class InputBoxComponent implements OnInit {
    @Input() placeholder: string = '';
    @Input() value: string = '';
    @Input() classes: string = '';
    @Input() tooltip: string = '';
    @Input() name: string = '';
    @Input() type: string = 'text';


    @Output()
    updateState: EventEmitter<object> = new EventEmitter<object>();

    constructor() {
    }


    ngOnInit() {
    }

    updateParent(event) {
        this.updateState.emit({
            value: event.target.value,
            field: this.name
        });
    }
}
