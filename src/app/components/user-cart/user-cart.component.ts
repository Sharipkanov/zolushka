import { Component, OnInit, Input } from '@angular/core';

import { IUser } from '../../interfaces/user.interface';
import { PopupsService } from '../../services/popups/popups.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { IDialog } from '../../interfaces/dialog.interface';
import { Router } from "@angular/router";

@Component({
    selector: 'app-user-cart',
    templateUrl: './user-cart.component.html',
    styleUrls: ['./user-cart.component.sass']
})
export class UserCartComponent implements OnInit {
    @Input() user: IUser;
    @Input() small: boolean = false;
    @Input() gridType: boolean = true;

    public favoritesPreloader: boolean = false;

    constructor(private _router: Router, private _dialogService: DialogService) {
    }

    ngOnInit() {
    }

    openChat(user: IUser) {
        const dialog = new IDialog();
        dialog.clientTo = user;
        this._dialogService.onAddNewDialog.emit(dialog);
    }

    addToFavorites(user: IUser) {
        this.favoritesPreloader = true;

        setTimeout(() => {
            this.favoritesPreloader = false;
        }, 3000);
    }

    goToProfile(e: Event, user: IUser) {
        const target = <HTMLElement>e.target;
        if (!target.classList.contains('js-user-cart-action')) {
            this._router.navigate([`/profile/${(user.type === 200) ? 'she' : 'he'}/${user.id}`]);
        }
    }
}
