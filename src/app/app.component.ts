import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
 public headerExpanded: boolean;
 public headerSearchBar: boolean;

  constructor(private _router: Router) {
    this._router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        const url = e.url;

        if (url === '/') {
          this.headerExpanded = true;
          this.headerSearchBar = true;
        } else if (url === '/catalog.html') {
          this.headerSearchBar = true;
        } else {
          this.headerExpanded = false;
          this.headerSearchBar = false;
        }
      }
    });
  }
}
