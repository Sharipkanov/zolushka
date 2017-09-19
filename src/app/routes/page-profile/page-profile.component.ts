import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {EnumsService} from '../../services/enums/enums.service';
import {IUserInfo} from '../../interfaces/user-info.interface';
import {IGalleryInfo} from '../../interfaces/gallery-info.interface';
import {OwlCarousel} from 'ngx-owl-carousel';
import {ActivatedRoute, Router} from '@angular/router';
import {IUser} from '../../interfaces/user.interface';
import {IDialog} from '../../interfaces/dialog.interface';
import {DialogService} from '../../services/dialog/dialog.service';
import {IProfile} from '../../interfaces/profile.interface';
import {PopupsService} from "../../services/popups/popups.service";

@Component({
  selector: 'app-page-profile',
  templateUrl: './page-profile.component.html',
  styleUrls: ['./page-profile.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class PageProfileComponent implements OnInit {

  public user_info = new IUserInfo();
  public model: IProfile = <IProfile>{};
  public enums = {};
  public preloaders = {
    total: false,
    photos: false,
    avatar: false
  };

  public selfProfile = false;

  public photoCurrentItem: number = 0;
  public profile_id;

  @ViewChild('photoCarousel') photoCarousel: OwlCarousel;

  public owlSettings = {
    items: 7,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 6
      },
      1141: {
        items: 7
      }
    }
  };

  public gallery: any = [];
  public gallery_info: any = new IGalleryInfo();

  constructor(private _popupsService: PopupsService, private _dialogService: DialogService, private _activatedRouter: ActivatedRoute, private _userService: UserService, private _enums: EnumsService) {
  }

  ngOnInit() {
    this.profile_id = this._activatedRouter.snapshot.params['profile_id'];
    if (!this.profile_id) {
      this.selfProfile = true;
    }
    this.preloaders.total = true;
    if (this.selfProfile) {
      const user_info = this._userService.info();
      if (user_info === undefined) {
        this._userService.onChangeUserInfo.subscribe(res => {
          this.user_info = res;
        });
      } else {
        this.user_info = user_info;
      }
    }

    this.getProfilPageInfo();

    this.getProfilePhotos();
  }

  getProfilePhotos(link: string = null) {
    const _self = this;
    this.preloaders.photos = true;
    _self._userService.getPhotos(link, this.profile_id).subscribe((response) => {
      _self.gallery_info = response;
      if (response._embedded) {
        for (let i = 0; i < _self.gallery_info._embedded.images.length; i++) {
          _self.gallery.push(_self.gallery_info._embedded.images[i]);
        }
      }

      this.owlBinding(response);
    });
  }

  owlBinding(response) {
    const _self = this;
    if (!this.gallery.length) {
      this.preloaders.photos = false;
      return;
    }
    setTimeout(() => {
      if (this.photoCurrentItem > 0) {
        _self.photoCarousel.$owlChild.$owl.trigger('to.owl.carousel', [this.photoCurrentItem, 0, true]);
      }
      this.preloaders.photos = false;
      _self.photoCarousel.$owlChild.$owl.on('changed.owl.carousel', function (e) {
        if (e.item.count - 1 <= e.item.index + e.page.size && !_self.preloaders.photos) {
          _self.photoCurrentItem = e.item.index;

          if (!!response._links.next) {
            _self.getProfilePhotos(response._links.next.href);
          }
        }
      });
    }, 500);
  }

  getProfilPageInfo() {
    this.enums = this._enums.getEnums();

    this._userService.profilePageInfo(this.profile_id).subscribe(res => {
      this.model = res;
      this.model._bodyCondition = [];
      this.model._sexualSection = [];

      for (const key in this.model) {
        if (key === 'hairColor' || key === 'eyeColor' || key === 'physique' || key === 'appearance') {
          if (!!this.model[key]) {
            this.model['_bodyCondition'].push(this.model[key]['title']);
          }
        } else if (key === 'sexualPeriodicity' || key === 'sexualPreference' || key === 'sexualRole') {
          if (!!this.model[key]) {
            this.model['_sexualSection'].push(this.model[key]['title']);
          }
        } else if (key === 'sexualKinds') {
          if (!!this.model[key]) {
            this.model['sexualKinds'].map(sex => {
              this.model['_sexualSection'].push(sex['title']);
            });
          }
        }
      }

      this.preloaders.total = false;
    });
  }

  uploadPhoto(e) {
    e.preventDefault();
    this.preloaders.photos = true;
    this._userService.uploadPhoto(e.target).subscribe((response) => {
        this.gallery = response._embedded.images;
        this.owlBinding(response);
      },
      error => console.log(error)
    );
  }

  /*removePhoto(id: number, index) {
   this.preloaders.photos = true;
   this._userService.removePhoto(id).subscribe(res => {
   this.gallery.splice(index, 1);
   console.log(res);
   this.preloaders.photos = false;
   });
   }

   cropPhoto(id: number, index) {
   console.log('crop photo')
   }*/

  openChat(user: IUser) {
    const dialog = new IDialog();
    dialog.clientTo = user;
    this._popupsService.openPopup('chat');
    this._dialogService.onAddNewDialog.emit(dialog);
  }

  confirmPhotoDialog(e: Event) {
    e.preventDefault();

    this._popupsService.openPopup('confirmPhoto');
  }
}
