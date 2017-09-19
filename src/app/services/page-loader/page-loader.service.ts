import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class PageLoaderService {

  public onStartLoad: EventEmitter<any> = new EventEmitter();
  public onEndLoad: EventEmitter<any> = new EventEmitter();

  constructor() { }

}
