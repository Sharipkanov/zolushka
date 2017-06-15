import { Component, OnInit, Input } from '@angular/core';

import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-cart-thumbnail',
  templateUrl: './user-cart-thumbnail.component.html',
  styleUrls: ['./user-cart-thumbnail.component.sass']
})
export class UserCartThumbnailComponent implements OnInit {
  @Input() small: boolean = false;
  @Input() user: IUser;

  constructor() { }

  ngOnInit() {
  }

}
