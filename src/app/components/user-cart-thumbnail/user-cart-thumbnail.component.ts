import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-cart-thumbnail',
  templateUrl: './user-cart-thumbnail.component.html',
  styleUrls: ['./user-cart-thumbnail.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class UserCartThumbnailComponent implements OnInit {
  @Input() small: boolean = false;
  @Input() user: IUser;
  @Input() classes: string = '';
  @Input() unmax: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
