import { Component, OnInit } from '@angular/core';
import {PopupsService} from '../../services/popups/popups.service';

@Component({
  selector: 'app-index-panel-chat-list',
  templateUrl: './index-panel-chat-list.component.html',
  styleUrls: ['./index-panel-chat-list.component.sass']
})
export class IndexPanelChatListComponent implements OnInit {

  constructor(private _popupsService: PopupsService) { }

  ngOnInit() {
  }

  openChat() {
    this._popupsService.openPopup('chat');
  }
}
