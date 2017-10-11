import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DialogService} from '../../../../services/dialog/dialog.service';

@Component({
  selector: 'app-popup-chat-folders',
  templateUrl: './popup-chat-folders.component.html',
  styleUrls: ['./popup-chat-folders.component.sass']
})
export class PopupChatFoldersComponent implements OnInit {

  @Input() folders;
  @Input() filterParams;
  @Output() applyFilter: EventEmitter<any> = new EventEmitter();

  public FNewFolder: FormGroup;
  public newFolderForm: boolean = false;
  public preloaders = {
    folderList: false,
    folderForm: false
  };

  constructor(private _dialogService: DialogService, private _fb: FormBuilder) { }

  ngOnInit() {
    this.FNewFolder = this._fb.group({
      title: ['', [Validators.required]]
    });

    this.preloaders.folderList = true;
    this._dialogService.getFolders().subscribe(response => {
      // console.log(response);
      this.folders = response;
      this.preloaders.folderList = false;
    });
  }

  applyFilterFn(data = null) {
    this.applyFilter.emit(data);
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
      this.folders.splice(i, 1);
      this.preloaders.folderList = false;
    });
  }
}
