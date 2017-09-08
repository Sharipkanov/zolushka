import { Injectable } from '@angular/core';

@Injectable()
export class UrlParserService {

  constructor() { }

  parseUrl($object) {
    const queryArray = {};

    for (const key in $object) {
      if (!!$object[key]) {
        if (Object.prototype.toString.call($object[key]) === '[object Array]') {
          queryArray[key] = [];
          for (let i = 0; i < $object[key].length; i++) {
            if (!$object[key][i].id) {
              continue;
            }
            queryArray[key].push($object[key][i].id);
          }
        } else if (!!$object[key]['id']) {
          queryArray[key] = $object[key].id.toString();
        } else if (typeof $object[key] === 'string' || typeof $object[key] === 'number') {
          queryArray[key] = $object[key].toString();
        }
      }
    }

    return queryArray;
  }
}
