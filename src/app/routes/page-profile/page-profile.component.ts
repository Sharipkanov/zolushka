import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-page-profile',
  templateUrl: './page-profile.component.html',
  styleUrls: ['./page-profile.component.sass']
})
export class PageProfileComponent implements OnInit {

  public user;
  public user_info;

  constructor(private _http: HttpService, private _userService: UserService) {

    this.user_info = this._userService.info();
    // this.user = this._http.get(`/api/api/client/${this.user_info['id']}`, null);
  }

  ngOnInit() {
  }

}
