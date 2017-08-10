import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { PopupsService } from '../../../services/popups/popups.service';
import { DialogService } from '../../../services/dialog/dialog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDialog } from '../../../interfaces/dialog.interface';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';

@Component({
    selector: 'app-popup-chat',
    templateUrl: './popup-chat.component.html',
    styleUrls: ['./popup-chat.component.sass'],
    encapsulation: ViewEncapsulation.None,
    // providers: [DialogService]
})
export class PopupChatComponent implements OnInit {

    @Input() visible: boolean = false;
    @ViewChild('messagesScroll') messagesScroll: PerfectScrollbarComponent;

    public folders = [];
    public filterParams = {};
    public dialogs: Array<IDialog> = [];
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
            console.log(response);
            this.folders = response;
            this.preloaders.folderList = false;
        });

        this.getDialogs();

        this._dialogService.onAddNewDialog.subscribe(data => {
            this.dialogs.unshift(data);
            this.dialogKey = 0;
            this.messages = [];
            this._popupsService.openPopup('chat');
        });
    }

    closePopup(e) {
        if (e.target.classList.contains('popup-wrapper') || e.target.classList.contains('js-close-popup') || !!e.target.closest('.js-close-popup')) {
            this._popupsService.closePopup('chat');

            if (!!this.dialogs[0] && !this.dialogs[0].id) {
                this.dialogs.shift();
                delete this.dialogKey;
            }
        }
    }

    getDialogs() {
        console.log(this.filterParams, !this.filterParams, Object.keys(this.filterParams).length);
        this._dialogService.getDialogs(this.filterParams).subscribe(response => {
            if (!!response._embedded) {
                this.dialogs = response._embedded.content;
            } else {
                this.dialogs = [];
            }
            delete this.dialogKey;
            this.messages = [];
            this.preloaders.dialogs = false;
        });
    }

    deleteDialog(e) {
        e.preventDefault();
        this.preloaders.dialogAction = true;
        this._dialogService.deleteDialog(this.dialogs[this.dialogKey].token).subscribe(response => {
            this.dialogs.splice(this.dialogKey, 1);
            delete this.dialogKey;
            this.messages = [];
            this.preloaders.dialogAction = false;
        });
    }

    favoriteDialog(e) {
        e.preventDefault();
        this.preloaders.dialogAction = true;
        this._dialogService.favoriteDialog(this.dialogs[this.dialogKey].token).subscribe(response => {
            this.dialogs[this.dialogKey] = response;
            this.preloaders.dialogAction = false;
        });
    }

    blacklistDialog(e) {
        e.preventDefault();
        this.preloaders.dialogAction = true;
        this._dialogService.blacklistDialog(this.dialogs[this.dialogKey].token).subscribe(response => {
            this.dialogs[this.dialogKey] = response;
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
        this.preloaders.messages = true;
        if (!!this.dialogs[this.dialogKey].token) {
            this._dialogService.getMessagesList(this.dialogs[this.dialogKey].token).subscribe(response => {
                if (!!response._embedded) {
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

                messagesOutput[customKey] = { messageDate: curDate, messageList: [] };
            }

            messagesOutput[customKey].messageList.push(value);
        });

        return messagesOutput;
    }

    sendMessage(e) {
        e.preventDefault();

        // save dialog to variable
        const movingDialog = this.dialogs[this.dialogKey];
        // remove dialog from scope
        this.dialogs.splice(this.dialogKey, 1);
        this.dialogs.unshift(movingDialog);
        this.dialogKey = 0;
        if (!!this.dialogs[this.dialogKey] && !!this.dialogs[this.dialogKey].token) {
            this.messages.push(this.FMessage.value);
            this._dialogService.addMessage(this.FMessage.value, this.dialogs[this.dialogKey]).subscribe(response => {
                    console.log(response);
                },
                error => {
                    console.log(error);
                    this.messages.pop();
                });
        } else if (!!this.dialogs[this.dialogKey]) {
            this._dialogService.addDialog(this.FMessage.value, this.dialogs[this.dialogKey].clientTo.id).subscribe(response => {
                this.dialogs[this.dialogKey] = response;
                console.log(response);
            });
        }
        this.FMessage.controls.message.setValue('');
    }

    applyFilter(data = null) {
        if (data !== null) {
            for (const key in data) {
                if(key !== 'folderId') {
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
}
