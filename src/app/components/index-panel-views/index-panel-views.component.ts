import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IPaginationUserSearch} from '../../interfaces/pagination.interface';
import {UsersService} from '../../services/users/users.service';
import {OwlCarousel} from 'ngx-owl-carousel';

@Component({
  selector: 'app-index-panel-views',
  templateUrl: './index-panel-views.component.html',
  styleUrls: ['./index-panel-views.component.sass']
})
export class IndexPanelViewsComponent implements OnInit {

  @Input() users: IPaginationUserSearch = new IPaginationUserSearch();
  @ViewChild('viewsCarousel') viewsCarousel: OwlCarousel;
  public preloader: boolean = false;

  constructor(private _usersService: UsersService) { }

  ngOnInit() {
    if (!this.users._embedded.clientCard) {
      this.preloader = true;
      this._usersService.getNewUsers(7).subscribe((users: IPaginationUserSearch) => {
        this.users = <IPaginationUserSearch>users;
        this.preloader = false;
      });
    }
  }

  moveCarousel(direction: string) {
    if (direction === 'prev') {
      this.viewsCarousel.previous([300]);
    } else {
      this.viewsCarousel.next([300]);
    }
  }
}
