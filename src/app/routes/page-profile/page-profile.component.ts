import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {EnumsService} from '../../services/enums/enums.service';
import {IUserInfo} from '../../interfaces/user-info';
import {IGalleryInfo} from "../../interfaces/gallery-info";

@Component({
    selector: 'app-page-profile',
    templateUrl: './page-profile.component.html',
    styleUrls: ['./page-profile.component.sass']
})
export class PageProfileComponent implements OnInit {

    public user_info = new IUserInfo();
    public model = {};
    public enums = {};

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

        this._userService.getPhotos().subscribe(response => {
            this.gallery_info = response;
            this.gallery = this.gallery_info._embedded.images;
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
