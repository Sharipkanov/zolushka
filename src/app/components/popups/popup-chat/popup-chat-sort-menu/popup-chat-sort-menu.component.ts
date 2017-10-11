import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-popup-chat-sort-menu',
  templateUrl: './popup-chat-sort-menu.component.html',
  styleUrls: ['./popup-chat-sort-menu.component.sass']
})
export class PopupChatSortMenuComponent implements OnInit {

  @Output() onApplyFilter: EventEmitter<any> = new EventEmitter();
  @Input() filterParams;

  constructor() { }

  ngOnInit() {
  }

  applyFilter(data = null) {
    this.onApplyFilter.emit(data);
  }
}
