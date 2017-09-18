import {Component, OnInit, ViewChild} from '@angular/core';

import {UsersService} from '../../services/users/users.service';
import {IUser} from '../../interfaces/user.interface';
import {SearchBarComponent} from "../../components/search-bar/search-bar.component";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {IPagination, IPaginationUserSearch} from "../../interfaces/pagination.interface";
import {StorageService} from "../../services/storage/storage.service";
import {UserService} from "../../services/user/user.service";
import {PopupsService} from "../../services/popups/popups.service";
import {UrlParserService} from "../../services/url-parser/url-parser.service";

@Component({
  selector: 'app-page-search',
  templateUrl: './page-search.component.html',
  styleUrls: ['./page-search.component.sass'],
  providers: [UsersService]
})
export class PageSearchComponent implements OnInit {
  public users: IPaginationUserSearch = <IPaginationUserSearch>{};
  public gridType: boolean = true;
  public filter: string = 'all';
  public firstLoad = true;
  public preloaders = {
    userGrid: false,
    filters: false
  };

  constructor(private _urlParserService: UrlParserService, private _popupsService: PopupsService, private _storageService: StorageService, private _router: Router, private _activatedRouter: ActivatedRoute, private _usersService: UsersService, private _userService: UserService) {
  }

  ngOnInit() {
    const storageGridType = this._storageService.get('catalogGridType');
    if (storageGridType === null) {
      this.gridType = true;
    } else {
      this.gridType = !!parseInt(storageGridType, 0);
    }

    const queryParams = {...this._activatedRouter.snapshot.queryParams};

    if (!!queryParams['realPhoto']) {
      this.filter = 'realPhoto';
    } else if (!!queryParams['online']) {
      this.filter = 'online';
    } else if (!!queryParams['newDays']) {
      this.filter = 'newDays';
    } else {
      this.filter = 'all';
    }

    // this.searchUsers(queryParams);

    this._activatedRouter.queryParams.subscribe(params => {
      const myParams = {...params};
      if (!myParams['type']) {
        myParams['type'] = 200;
      }
      this.searchUsers(myParams);
    });
  }

  searchUsersQuery(searchObject) {
    const queryArray = this._urlParserService.parseUrl(searchObject);

    this._router.navigate(['/search'], {queryParams: queryArray});
  }

  searchUsers(data = null) {
    this.preloaders.userGrid = true;
    this._usersService.searchUsers(data).subscribe((users: IPaginationUserSearch) => {
      this.users = <IPaginationUserSearch>users;
      this.preloaders.userGrid = false;
      this.firstLoad = false;
    }, error => {
      if (this.filter === 'realPhoto') {
        this._popupsService.openPopup('buyConfirmedPhotos');
        this.preloaders.userGrid = false;
      }
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

  changeFilter(filter: string) {

    const queryParams = {...this._activatedRouter.snapshot.queryParams};
    let makeQuery = true;

    delete queryParams['newDays'];
    delete queryParams['online'];
    delete queryParams['realPhoto'];
    delete queryParams['page'];

    switch (filter) {
      case 'newDays':
        queryParams['newDays'] = 3;
        break;
      case 'online':
        if (this._userService.token().length) {
          queryParams['online'] = true;
        } else {
          this._popupsService.openPopup('regBeforeFilterByOnline');
          makeQuery = false;
        }
        break;
      case 'realPhoto':
        if (this._userService.token().length) {
          queryParams['realPhoto'] = true;
        } else {
          this._popupsService.openPopup('regBeforeFilterByRealPhoto');
          makeQuery = false;
        }
        break;
    }

    if (makeQuery === true) {
      this.filter = filter;
      this._router.navigate([], {queryParams: queryParams});
    }
  }
}
