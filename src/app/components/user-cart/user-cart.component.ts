import { Component, OnInit, Input } from '@angular/core';

import { IUser} from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.sass']
})
export class UserCartComponent implements OnInit {
  @Input() user: IUser;
  @Input() small: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
