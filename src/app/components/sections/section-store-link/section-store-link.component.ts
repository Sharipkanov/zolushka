import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-section-store-link',
  templateUrl: './section-store-link.component.html',
  styleUrls: ['./section-store-link.component.sass']
})
export class SectionStoreLinkComponent implements OnInit {
  @Input() backgroundImage: boolean = false;

  public FFooterForm = new FormGroup({
    phone: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
  }

}
