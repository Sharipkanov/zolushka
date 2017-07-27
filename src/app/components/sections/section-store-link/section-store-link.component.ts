import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-section-store-link',
    templateUrl: './section-store-link.component.html',
    styleUrls: ['./section-store-link.component.sass']
})
export class SectionStoreLinkComponent implements OnInit {
    @Input() backgroundImage: boolean = true;

    public FFooterForm: FormGroup;

    constructor(private _fb: FormBuilder) {
    }

    ngOnInit() {
        this.FFooterForm = this._fb.group({
            phone: ''
        });
    }

}
