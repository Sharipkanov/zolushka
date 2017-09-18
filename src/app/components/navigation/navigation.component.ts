import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {IUserInfo} from '../../interfaces/user-info.interface';
import {PopupsService} from '../../services/popups/popups.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {

  @Input()
  public user_info = new IUserInfo();

  constructor(private _popupsService: PopupsService, private _userService: UserService) {
  }

  ngOnInit() {
    const userInfo = this._userService.info();

    if (userInfo === undefined) {
      this._userService.onChangeUserInfo.subscribe(res => {
        this.user_info = res;
      });
    } else {
      this.user_info = userInfo;
    }

    console.log(this.user_info)
  }

  navigationLogout() {
    this._userService.logout();
  }

  openChat(e) {
    e.preventDefault();

    this._popupsService.openPopup('chat');
  }
}
