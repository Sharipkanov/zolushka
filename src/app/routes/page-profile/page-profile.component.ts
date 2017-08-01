import {
    AfterContentChecked, AfterContentInit, AfterViewChecked, Component, OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {EnumsService} from '../../services/enums/enums.service';
import {IUserInfo} from '../../interfaces/user-info';
import {IGalleryInfo} from '../../interfaces/gallery-info';
import {OwlCarousel} from 'ng2-owl-carousel';

@Component({
    selector: 'app-page-profile',
    templateUrl: './page-profile.component.html',
    styleUrls: [
        './page-profile.component.sass'
    ],
    encapsulation: ViewEncapsulation.None
})
export class PageProfileComponent implements OnInit, AfterViewChecked {

    public user_info = new IUserInfo();
    public model = {};
    public enums = {};

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

    ngAfterViewChecked() {
        const _self = this;

            /*_self.photoCarousel.$owlChild.$owl.on('changed.owl.carousel', function (e) {
                console.log(e.item.count, e.item.index, e.page.size);
                if (e.item.count - 1 <= e.item.index + e.page.size) {
                    /!*_self._userService.getPhotos().subscribe((response) => {
                     _self.gallery_info = response;
                     for (let i = 0; i < _self.gallery_info._embedded.images.length; i++) {
                     _self.gallery.push(_self.gallery_info._embedded.images[i]);
                     }
                     });*!/
                }
            });*/
    }

    getProfilePhotos() {
        const _self = this;
        _self._userService.getPhotos().subscribe((response) => {
            _self.gallery_info = response;
            for (let i = 0; i < _self.gallery_info._embedded.images.length; i++) {
                _self.gallery.push(_self.gallery_info._embedded.images[i]);
            }

            setTimeout(() => {
                _self.photoCarousel.$owlChild.$owl.on('changed.owl.carousel', function () {
                    console.log('hi')
                })
            }, 1)

        });
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

        this._userService.uploadPhoto(e.target).subscribe((data) => {
                this.gallery = data._embedded.images;
                console.log(data);
            },
            error => console.log(error)
        );
    }
}
