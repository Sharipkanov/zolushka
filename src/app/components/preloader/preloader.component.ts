import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.sass']
})
export class PreloaderComponent implements OnInit {

  @Input() big: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
