import {Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {PopupsService} from '../../../services/popups/popups.service';
import {DialogService} from '../../../services/dialog/dialog.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IDialog} from '../../../interfaces/dialog.interface';
import {PerfectScrollbarComponent} from 'ngx-perfect-scrollbar';
import {IPagination, IPaginationDialogs} from '../../../interfaces/pagination.interface';
import {IDialogMessage} from "../../../interfaces/dialog-message.interface";

@Component({
  selector: 'app-popup-chat',
  templateUrl: './popup-chat.component.html',
  styleUrls: ['./popup-chat.component.sass'],
  encapsulation: ViewEncapsulation.None,
  // providers: [DialogService]
})
export class PopupChatComponent implements OnInit, OnDestroy {

  @Input() visible: boolean = false;
  @ViewChild('messagesScroll') messagesScroll: PerfectScrollbarComponent;

  public folders = [];
  public filterParams = {};
  public dialogs: IPagination = new IPagination();
  public dialog: IDialog;
  public dialogKey: number;
  public messages = [];
  public nativeMessage: IPagination = new IPagination();

  public preloaders = {
    dialogs: true,
    messages: false,
    dialogAction: false
  };

  public FMessage: FormGroup;

  constructor(private _fb: FormBuilder, private _dialogService: DialogService) {
  }

  ngOnInit() {
    this.FMessage = this._fb.group({
      message: ['', [Validators.required, Validators.minLength(1)]]
    });

    this.getDialogs();

    this._dialogService.onAddNewDialog.subscribe((dialog: IDialog) => {
      this.dialogs._embedded.content.unshift(dialog);
      this.dialog = new IDialog(dialog);
      this.messages = [];
    });
  }

  infineFolderScroll() {
    console.log('scroll');
  }

  getDialogs(update: boolean = true) {
    this._dialogService.getDialogs(this.filterParams).subscribe((response: IPaginationDialogs) => {
      if (!!response._embedded) {
        if (update) {
          this.dialogs = <IPaginationDialogs>response;
          // console.log(this.dialogs);
        } else {
          for (let i = 0; i < response._embedded.content.length; i++) {
            this.dialogs._embedded.content.push(new IDialog(response._embedded.content[i]));
          }
        }
      } else {
        this.dialogs._embedded.content = [];
      }
      delete this.dialog;
      this.messages = [];
      this.preloaders.dialogs = false;
    });
  }

  deleteDialog(e) {
    e.preventDefault();
    this.preloaders.dialogAction = true;
    this._dialogService.deleteDialog(this.dialog.token).subscribe(response => {
      this.dialogs._embedded.content.splice(this.dialogKey, 1);
      delete this.dialogKey;
      this.messages = [];
      this.preloaders.dialogAction = false;
    });
  }

  favoriteDialog(e) {
    e.preventDefault();
    this.preloaders.dialogAction = true;
    this._dialogService.favoriteDialog(this.dialog.token).subscribe((response: IDialog) => {
      this.dialogs[this.dialogKey] = response;
      if (!!this.filterParams['favorite'] && !this.dialogs[this.dialogKey].favorite) {
        this.dialogs._embedded.content.splice(this.dialogKey, 1);
      } else {
        this.dialogs._embedded.content.unshift(this.dialog);
        this.dialogKey = 0;
      }
      this.preloaders.dialogAction = false;
    });
  }

  blacklistDialog(e) {
    e.preventDefault();
    this.preloaders.dialogAction = true;
    this._dialogService.blacklistDialog(this.dialog.token).subscribe((response: IDialog) => {
      this.dialogs[this.dialogKey] = response;
      if (!!this.filterParams['blacklist'] && !this.dialogs[this.dialogKey].blacklist) {
        this.dialogs._embedded.content.splice(this.dialogKey, 1);
      } else {
        this.dialogs._embedded.content.unshift(this.dialog);
        this.dialogKey = 0;
      }
      this.preloaders.dialogAction = false;
    });
  }

  openMessages(i) {
    this.dialogKey = i;
    this.dialog = this.dialogs._embedded.content[this.dialogKey];
    this.preloaders.messages = true;
    if (!!this.dialog && !!this.dialog.token) {
      this._dialogService.getMessagesList(this.dialog.token).subscribe((response: IPagination) => {
        if (!!response._embedded) {
          this.nativeMessage = response;
          this.messages = this.filterMessages(response._embedded.content);
          setTimeout(() => {
            this.messagesScroll.directiveRef.scrollToTop(this.messagesScroll.directiveRef.elementRef.nativeElement.getElementsByClassName('ps-content')[0].clientHeight);
          }, 200);
        } else {
          this.messages = [];
        }

        this.preloaders.messages = false;
      }, error => {
        console.log(error);
      });
    } else {
      this.messages = [];
      this.preloaders.messages = false;
    }
  }

  filterMessages(messages: Array<any>) {
    let curDate;
    let customKey = null;
    const messagesOutput = [];
    messages.map((value) => {
      if (curDate !== value.createdDate) {
        curDate = value.createdDate;
        if (customKey !== null) {
          customKey += 1;
        } else {
          customKey = 0;
        }

        messagesOutput[customKey] = {messageDate: curDate, messageList: []};
      }

      messagesOutput[customKey].messageList.push(value);
    });

    return messagesOutput;
  }

  sendMessage(e) {
    e.preventDefault();
    if (this.FMessage.valid) {

      // remove dialog from scope
      this.moveDialogToTop();

      if (!!this.dialog && !!this.dialog.token) {
        const messageIndex = this.renderNewMessage(this.FMessage.value);
        this._dialogService.addMessage(this.FMessage.value, this.dialog.token).subscribe(response => {
            this.messages[messageIndex.messageGroupIndex].messageList[messageIndex.messageIndex] = response;
          },
          error => {
            console.log(error);
            this.messages.pop();
          });
      } else if (!!this.dialog) {
        this._dialogService.addDialog(this.FMessage.value, this.dialog.clientTo.id).subscribe(response => {
          this.dialog = response;
          this.dialogs._embedded.content[this.dialogKey] = this.dialog;
          console.log(response);
        });
      }
      this.FMessage.reset();
      this.FMessage.controls.message.markAsPristine();
    }
  }

  renderNewMessage(message: IDialogMessage) {
    let pushed = false;
    const date = new Date();
    const messageDate = `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    for (let i = 0; i < this.messages.length; i++) {
      if (this.messages[i].messageDate === messageDate) {
        pushed = true;
        this.messages[i].messageList.push(new IDialogMessage(message));
      }
    }
    if (!pushed) {
      this.messages.push({messageDate: messageDate, messageList: [new IDialogMessage(message)]});
    }

    setTimeout(() => {
      this.messagesScroll.directiveRef.scrollToTop(this.messagesScroll.directiveRef.elementRef.nativeElement.getElementsByClassName('ps-content')[0].clientHeight);
    }, 200);

    return {messageGroupIndex: this.messages.length - 1, messageIndex: this.messages[this.messages.length - 1].messageList.length - 1};
  }

  moveDialogToTop() {
    if (this.dialogKey !== 0) {
      this.dialogs._embedded.content.splice(this.dialogKey, 1);
      this.dialogs._embedded.content.unshift(this.dialog);
      this.dialogKey = 0;
    }
  }

  applyFilter(data = null) {
    this.preloaders.dialogs = true;
    if (data !== null) {
      for (const key of Object.keys(data)) {
        if (key !== 'folderId') {
          for (const Key in this.filterParams) {
            if (key !== Key && Key !== 'folderId') {
              delete this.filterParams[Key];
            }
          }

        }
        this.filterParams[key] = data[key];
      }
    } else {
      this.filterParams = {};
    }

    this.getDialogs();
  }

  ngOnDestroy() {
    this.filterParams = {};
    this.dialogKey = null;
    this.dialogs._embedded.content = [];
    this.messages = [];
  }
}
