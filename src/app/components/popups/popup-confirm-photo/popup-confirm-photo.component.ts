import {Component, OnInit} from '@angular/core';
import {IProfile} from '../../../interfaces/profile.interface';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-popup-confirm-photo',
  templateUrl: './popup-confirm-photo.component.html',
  styleUrls: ['./popup-confirm-photo.component.sass']
})
export class PopupConfirmPhotoComponent implements OnInit {

  public user: IProfile = <IProfile>{};

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.user = this._userService.info();
  }

  uploadConfirmationPhoto(e: Event) {
    console.log('upload', e);
  }
}
