import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gift-box',
  templateUrl: './gift-box.component.html',
  styleUrls: ['./gift-box.component.sass']
})
export class GiftBoxComponent implements OnInit {
  @Input() number: number;

  constructor() { }

  ngOnInit() {

  }

}
