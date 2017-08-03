import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {EnumsService} from '../../services/enums/enums.service';
import {IUserInfo} from '../../interfaces/user-info';
import {IGalleryInfo} from '../../interfaces/gallery-info';
import {OwlCarousel} from 'ngx-owl-carousel';

@Component({
    selector: 'app-page-profile',
    templateUrl: './page-profile.component.html',
    styleUrls: [
        './page-profile.component.sass'
    ],
    encapsulation: ViewEncapsulation.None
})
export class PageProfileComponent implements OnInit {

    public user_info = new IUserInfo();
    public model = {};
    public enums = {};
    public queryInProcess: boolean = false;
    public photoCurrentItem: number = 0;

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

    constructor(private _userService: UserService, private _enums: EnumsService) {
    }

    ngOnInit() {
        const user_info = this._userService.info();
        if (user_info === undefined) {
            this._userService.onChangeUserInfo.subscribe(res => {
                this.user_info = res;
            });
        } else {
            this.user_info = user_info;
        }

        this.getProfilPageInfo();

        this.getProfilePhotos();
    }

    getProfilePhotos(link: string = null) {
        const _self = this;
        this.queryInProcess = true;
        _self._userService.getPhotos(link).subscribe((response) => {
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
        setTimeout(() => {
            if (this.photoCurrentItem > 0) {
                _self.photoCarousel.$owlChild.$owl.trigger('to.owl.carousel', [this.photoCurrentItem, 0, true]);
            }
            this.queryInProcess = false;
            _self.photoCarousel.$owlChild.$owl.on('changed.owl.carousel', function (e) {
                if (e.item.count - 1 <= e.item.index + e.page.size && !_self.queryInProcess) {
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

        this._userService.profilePageInfo().subscribe(res => {
            this.model = res;
            this.model['_bodyCondition'] = [];
            this.model['_sexualSection'] = [];

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
        });
    }

    uploadPhoto(e) {
        e.preventDefault();
        this.queryInProcess = true;
        this._userService.uploadPhoto(e.target).subscribe((response) => {
                this.gallery = response._embedded.images;
                this.owlBinding(response);
            },
            error => console.log(error)
        );
    }

    /*removePhoto(id: number, index) {
        this.queryInProcess = true;
        this._userService.removePhoto(id).subscribe(res => {
            this.gallery.splice(index, 1);
            console.log(res);
            this.queryInProcess = false;
        });
    }

    cropPhoto(id: number, index) {
        console.log('crop photo')
    }*/
}
