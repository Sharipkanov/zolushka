import { Component, OnInit, Input } from '@angular/core';

import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-cart-tiny',
  templateUrl: './user-cart-tiny.component.html',
  styleUrls: ['./user-cart-tiny.component.sass']
})
export class UserCartTinyComponent implements OnInit {
  @Input() user: IUser;

  constructor() { }

  ngOnInit() {
  }

}
