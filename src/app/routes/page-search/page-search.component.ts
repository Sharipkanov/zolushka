import {Component, OnInit, ViewChild} from '@angular/core';

import {UsersService} from '../../services/users/users.service';
import {IUser} from '../../interfaces/user.interface';
import {SearchBarComponent} from "../../components/search-bar/search-bar.component";
import {ActivatedRoute, Router} from "@angular/router";
import {IPagination, IPaginationUserSearch} from "../../interfaces/pagination.interface";

@Component({
    selector: 'app-page-search',
    templateUrl: './page-search.component.html',
    styleUrls: ['./page-search.component.sass'],
    providers: [UsersService]
})
export class PageSearchComponent implements OnInit {
    public users: IPaginationUserSearch = <IPaginationUserSearch>{};

    constructor(private _router: Router, private _activatedRouter: ActivatedRoute, private usersService: UsersService) {
    }

    ngOnInit() {
        this.searchUsers(this._activatedRouter.snapshot.params);
    }

    searchUsersSubmit(e) {
        e.preventDefault();
    }

    searchUsersQuery(searchObject) {
        const queryArray = {};
        for (const key in searchObject) {
            if (!!searchObject[key]) {
                if (Object.prototype.toString.call( searchObject[key] ) === '[object Array]') {
                    queryArray[key] = [];
                    for (let i = 0; i < searchObject[key].length; i++) {
                        queryArray[key].push(searchObject[key][i].id);
                    }
                } else {
                    queryArray[key] = searchObject[key].id;
                }
            }
        }
        console.log(this._router.navigate([queryArray]));

        this.searchUsers(queryArray);
    }

    searchUsers(data = null) {
        console.log(data);
        this.usersService.searchUsers(data).subscribe((users: IPaginationUserSearch) => {
            console.log(users);
            this.users = <IPaginationUserSearch>users;
        });
    }
}
