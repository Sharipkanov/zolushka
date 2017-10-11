import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {IPaginationDialogs} from '../../../../interfaces/pagination.interface';

@Component({
  selector: 'app-popup-chat-dialogs',
  templateUrl: './popup-chat-dialogs.component.html',
  styleUrls: ['./popup-chat-dialogs.component.sass']
})
export class PopupChatDialogsComponent implements OnInit {

  @Input() dialogs: IPaginationDialogs;
  @Input() dialogKey: number = 0;
  @Input() filterParams;
  @Output() openMessages: EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  infineFolderScroll() {
    console.log('scroll');
  }

  openMessagesFn(data) {
    this.openMessages.emit(data);
  }

}
