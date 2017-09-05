import {Component, OnInit, ViewChild} from '@angular/core';

import {UsersService} from '../../services/users/users.service';
import {IUser} from '../../interfaces/user.interface';
import {SearchBarComponent} from "../../components/search-bar/search-bar.component";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {IPagination, IPaginationUserSearch} from "../../interfaces/pagination.interface";
import {StorageService} from "../../services/storage/storage.service";

@Component({
    selector: 'app-page-search',
    templateUrl: './page-search.component.html',
    styleUrls: ['./page-search.component.sass'],
    providers: [UsersService]
})
export class PageSearchComponent implements OnInit {
    public users: IPaginationUserSearch = <IPaginationUserSearch>{};
    public gridType: boolean = true;
    public preloaders = {
        userGrid: false,
        filters: false
    };

    constructor(private _storageService: StorageService, private _router: Router, private _activatedRouter: ActivatedRoute, private _usersService: UsersService) {
    }

    ngOnInit() {
        this.gridType = !!parseInt(this._storageService.get('catalogGridType'), 0);

        const queryParams = {...this._activatedRouter.snapshot.queryParams};
        if (!queryParams['type']) {
            queryParams['type'] = 200;
        }

        this.searchUsers(queryParams);

        this._activatedRouter.queryParams.subscribe(params => {
            const myParams = {...params};
            if (!myParams['type']) {
                myParams['type'] = 200;
            }
            this.searchUsers(myParams);
        });
    }

    searchUsersQuery(searchObject) {
        const queryArray = {};

        for (const key in searchObject) {
            if (!!searchObject[key]) {
                if (Object.prototype.toString.call(searchObject[key]) === '[object Array]') {
                    queryArray[key] = [];
                    for (let i = 0; i < searchObject[key].length; i++) {
                        if (!searchObject[key][i].id) {
                            continue;
                        }
                        queryArray[key].push(searchObject[key][i].id);
                    }
                } else if (!!searchObject[key]['id']) {
                    queryArray[key] = searchObject[key].id.toString();
                } else if (typeof searchObject[key] === 'string' || typeof searchObject[key] === 'number') {
                    queryArray[key] = searchObject[key].toString();
                }
            }
        }

        this._router.navigate(['/search'], {queryParams: queryArray});
    }

    searchUsers(data = null) {
        this.preloaders.userGrid = true;
        this._usersService.searchUsers(data).subscribe((users: IPaginationUserSearch) => {
            this.users = <IPaginationUserSearch>users;
            this.preloaders.userGrid = false;
        });
    }

    switchGridType(grid: boolean) {
        this.gridType = grid;
        if (grid) {
            this._storageService.set('catalogGridType', 1);
        } else {
            this._storageService.set('catalogGridType', 0);
        }

    }
}
