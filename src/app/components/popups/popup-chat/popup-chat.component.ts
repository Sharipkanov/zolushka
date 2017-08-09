import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {PopupsService} from '../../../services/popups/popups.service';
import {DialogService} from '../../../services/dialog/dialog.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IDialog} from '../../../interfaces/dialog';

@Component({
    selector: 'app-popup-chat',
    templateUrl: './popup-chat.component.html',
    styleUrls: ['./popup-chat.component.sass'],
    encapsulation: ViewEncapsulation.None,
    // providers: [DialogService]
})
export class PopupChatComponent implements OnInit {

    @Input() visible: boolean = false;

    public folders = [];
    public dialogs: Array<IDialog> = [];
    public dialog;
    public messages = [];
    public conntection;

    public newFolderForm: boolean = false;
    public preloaders = {
        folderForm: false,
        folderList: true,
        dialogs: true,
        messages: false,
        messageForm: true
    };

    public FNewFolder: FormGroup;
    public FMessage: FormGroup;

    constructor(private _fb: FormBuilder, private _popupsService: PopupsService, private _dialogService: DialogService) {
    }

    ngOnInit() {
        this.FNewFolder = this._fb.group({
            title: ['', [Validators.required, Validators.minLength(5)]]
        });
        this.FMessage = this._fb.group({
            message: ['', [Validators.required, Validators.minLength(5)]]
        });

        this._dialogService.getFolders().subscribe(response => {
            this.folders = response;
            this.preloaders.folderList = false;
        });

        this._dialogService.getDialogs().subscribe(response => {
            if (!!response._embedded) {
                this.dialogs = response._embedded.content;
            }
            this.preloaders.dialogs = false;
            console.log(response);
        });

        this._dialogService.onAddNewDialog.subscribe(data => {
            this.dialogs.unshift(data);
            this._popupsService.openPopup('chat');
            console.log(this.dialogs);
        });
    }

    closePopup(e) {
        if (e.target.classList.contains('popup-wrapper') || e.target.classList.contains('js-close-popup') || !!e.target.closest('.js-close-popup')) {
            this._popupsService.closePopup('chat');

            if (!!this.dialogs[0] && !this.dialogs[0].id) {
                this.dialogs.shift();
                delete this.dialog;
            }
        }
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

    openMessages(dialog) {
        this.dialog = dialog;
        this.preloaders.messages = true;
        console.log(dialog);
        if (!!dialog.token) {
            this._dialogService.getMessagesList(dialog.token).subscribe(response => {
                if (!!response._embedded) {
                    this.messages = response._embedded.content;
                } else {
                    this.messages = [];
                }
                console.log(response);

                this.preloaders.messages = false;
            }, error => {
                console.log(error);
            });
        } else {
            this.messages = [];
            this.preloaders.messages = false;
        }
    }

    sendMessage(e) {
        e.preventDefault();
        // remove data from input

        this.preloaders.messageForm = true;
        if (!!this.dialog && !!this.dialog.token) {
            this.messages.push(this.FMessage.value);
            this._dialogService.addMessage(this.FMessage.value, this.dialog).subscribe(response => {

            });
        } else if (!!this.dialog) {
            this._dialogService.addDialog(this.FMessage.value, this.dialog.clientTo.id).subscribe(response => {
                console.log(response);
            });
        }
        this.FMessage.controls.message.setValue('');
    }
}
