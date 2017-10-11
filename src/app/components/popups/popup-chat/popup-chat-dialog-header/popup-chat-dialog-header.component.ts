import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDialog} from '../../../../interfaces/dialog.interface';
import {DialogService} from '../../../../services/dialog/dialog.service';

@Component({
  selector: 'app-popup-chat-dialog-header',
  templateUrl: './popup-chat-dialog-header.component.html',
  styleUrls: ['./popup-chat-dialog-header.component.sass']
})
export class PopupChatDialogHeaderComponent implements OnInit {

  @Input() dialog: IDialog;
  @Output() onDeleteDialog: EventEmitter<any> = new EventEmitter();
  @Output() onFavoriteDialog: EventEmitter<any> = new EventEmitter();
  @Output() onBlacklistDialog: EventEmitter<any> = new EventEmitter();

  public preloader: boolean = false;

  constructor(private _dialogService: DialogService) { }

  ngOnInit() {
  }

  deleteDialog(e) {
    e.preventDefault();
    this.preloader = true;
    this._dialogService.deleteDialog(this.dialog.token).subscribe(response => {
      this.preloader = false;
    });
  }

  favoriteDialog(e) {
    e.preventDefault();
    this.preloader = true;
    this._dialogService.favoriteDialog(this.dialog.token).subscribe((response: IDialog) => {
      console.log(response);
      this.dialog = response;
      /*this.dialogs[this.dialogKey] = response;
      if (!!this.filterParams['favorite'] && !this.dialogs[this.dialogKey].favorite) {
        this.dialogs._embedded.content.splice(this.dialogKey, 1);
      } else {
        this.dialogs._embedded.content.unshift(this.dialog);
        this.dialogKey = 0;
      }*/
      this.preloader = false;
    });
  }

  blacklistDialog(e) {
    e.preventDefault();
    this.preloader = true;
    this._dialogService.blacklistDialog(this.dialog.token).subscribe((response: IDialog) => {
      console.log(response);
      this.dialog = response;
      /*this.dialogs[this.dialogKey] = response;
      if (!!this.filterParams['blacklist'] && !this.dialogs[this.dialogKey].blacklist) {
        this.dialogs._embedded.content.splice(this.dialogKey, 1);
      } else {
        this.dialogs._embedded.content.unshift(this.dialog);
        this.dialogKey = 0;
      }*/
      this.preloader = false;
    });
  }

}
