import {Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {PopupsService} from '../../../services/popups/popups.service';
import {DialogService} from '../../../services/dialog/dialog.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IDialog} from '../../../interfaces/dialog.interface';
import {PerfectScrollbarComponent} from 'ngx-perfect-scrollbar';
import {IPagination, IPaginationDialogs} from '../../../interfaces/pagination.interface';

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

    public newFolderForm: boolean = false;
    public preloaders = {
        folderForm: false,
        folderList: true,
        dialogs: true,
        messages: false,
        dialogAction: false
    };

    public FNewFolder: FormGroup;
    public FMessage: FormGroup;

    constructor(private _fb: FormBuilder, private _popupsService: PopupsService, private _dialogService: DialogService) {
    }

    ngOnInit() {
        this.FNewFolder = this._fb.group({
            title: ['', [Validators.required]]
        });
        this.FMessage = this._fb.group({
            message: ['', [Validators.required]]
        });

        this._dialogService.getFolders().subscribe(response => {
            // console.log(response);
            this.folders = response;
            this.preloaders.folderList = false;
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

    /*closePopup(e) {
        if (e.target.classList.contains('popup-wrapper') || e.target.classList.contains('js-close-popup') || !!e.target.closest('.js-close-popup')) {
            this._popupsService.closePopup('chat');

            if (!!this.dialogs._embedded.content[0] && !this.dialogs._embedded.content[0].id) {
                this.dialogs._embedded.content.shift();
                delete this.dialog;
            }
        }
    }*/

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

    addNewFolder(e) {
        e.preventDefault();
        if (!this.FNewFolder.invalid) {
            this.preloaders.folderForm = true;
            this._dialogService.addFolder(this.FNewFolder.value).subscribe(response => {
                this.folders = response;
                this.preloaders.folderForm = false;
                this.newFolderForm = false;
                this.FNewFolder.controls.title.setValue('');
            });
        }
    }

    removeFolder(e, i) {
        e.preventDefault();
        this.preloaders.folderList = true;
        this._dialogService.deleteFolder(this.folders[i]).subscribe(response => {
            console.log(response);
            this.folders.splice(i, 1);
            this.preloaders.folderList = false;
        });
    }

    openMessages(i) {
        this.dialogKey = i;
        this.dialog = this.dialogs._embedded.content[this.dialogKey];
        this.preloaders.messages = true;
        if (!!this.dialog && !!this.dialog.token) {
            this._dialogService.getMessagesList(this.dialog.token).subscribe((response: IPagination) => {
                if (!!response._embedded) {
                    // console.log(response._embedded.content);
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

        // remove dialog from scope
        this.dialogs._embedded.content.splice(this.dialogKey, 1);
        this.dialogs._embedded.content.unshift(this.dialog);
        this.dialogKey = 0;
        if (!!this.dialog && !!this.dialog.token) {
            this.messages.push(this.FMessage.value);
            this._dialogService.addMessage(this.FMessage.value, this.dialog.token).subscribe(response => {
                    console.log(response);
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
        this.FMessage.controls.message.setValue('');
    }

    applyFilter(data = null) {
        this.preloaders.dialogs = true;
        if (data !== null) {
            for (const key in data) {
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
