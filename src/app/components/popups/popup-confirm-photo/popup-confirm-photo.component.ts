import {Component, Input, OnInit} from '@angular/core';
import {PopupsService} from '../../../services/popups/popups.service';
import {IProfile} from '../../../interfaces/profile.interface';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-popup-confirm-photo',
  templateUrl: './popup-confirm-photo.component.html',
  styleUrls: ['./popup-confirm-photo.component.sass']
})
export class PopupConfirmPhotoComponent implements OnInit {

  @Input() visible: boolean = false;
  @Input() user: IProfile = <IProfile>{};

  constructor(private _popupsService: PopupsService, private _userService: UserService) { }

  ngOnInit() {
    this.user = this._userService.info();
  }

  closePopup(e) {
    if (e.target.classList.contains('popup-wrapper') || e.target.classList.contains('js-close-popup')) {
      this._popupsService.closePopup('confirmPhoto');
    }
  }

  uploadeConfirmationPhoto(e: Event) {
    console.log('upload', e);
  }
}
