import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {PopupsService} from '../../../services/popups/popups.service';
import {DialogService} from '../../../services/dialog/dialog.service';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-popup-chat',
    templateUrl: './popup-chat.component.html',
    styleUrls: ['./popup-chat.component.sass'],
    encapsulation: ViewEncapsulation.None
})
export class PopupChatComponent implements OnInit {

    @Input() visible: boolean = false;

    public folders = [];
    public dialogs = [];
    public messages = [];

    public newFolderForm: boolean = false;
    public preloaders = {
        folderForm: false,
        folderList: true,
        dialogs: true,
        messages: true,
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
                // TODO set new dialogs
            }
            this.preloaders.dialogs = false;
        })
    }

    closePopup(e) {
        if (e.target.classList.contains('popup-wrapper') || e.target.classList.contains('js-close-popup')) {
            this._popupsService.closePopup('chat');
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
}
