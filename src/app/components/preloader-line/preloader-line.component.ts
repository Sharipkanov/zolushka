import {Component, OnInit} from '@angular/core';
import {PageLoaderService} from '../../services/page-loader/page-loader.service';

@Component({
  selector: 'app-preloader-line',
  templateUrl: './preloader-line.component.html',
  styleUrls: ['./preloader-line.component.sass']
})
export class PreloaderLineComponent implements OnInit {

  public interval;
  public preloaderProgress: number = 0;

  constructor(private _pageLoaderService: PageLoaderService) {
  }

  ngOnInit() {
    this._pageLoaderService.onStartLoad.subscribe(() => {
      this.initPreloader();
    });

    this._pageLoaderService.onEndLoad.subscribe(() => {
      this.stopPreloader();
    });
  }

  initPreloader() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.preloaderProgress += ((100 - this.preloaderProgress) * 0.03);

      if (this.preloaderProgress > 100) {
        clearInterval(this.interval);
      }
    }, 100);
  }

  stopPreloader() {
    clearInterval(this.interval);
    if (!!this.preloaderProgress) {
      this.preloaderProgress = 100;
    }
    setTimeout(() => {
      this.preloaderProgress = 0;
    }, 1000);
  }

}
