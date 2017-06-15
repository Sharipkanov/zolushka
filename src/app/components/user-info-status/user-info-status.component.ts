import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-info-status',
  templateUrl: './user-info-status.component.html',
  styleUrls: ['./user-info-status.component.sass']
})
export class UserInfoStatusComponent implements OnInit {
  @Input() firstName: string = '';
  @Input() externalInfo: string = '';
  @Input() status: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
