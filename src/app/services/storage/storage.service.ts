import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  private _service: string = null;

  constructor() {
    this._setStorageService();
  }

  /**
   * Set to storage
   * @param key
   * @param value
   * @param expDate
   * @returns {any}
   */
  set(key: string, value: any, expDate: number = 0) {
    switch (this._service) {
      case 'cookie' :
          return this._setCookie(key, value, expDate);
      case 'localStorage' :
        break;

      default:
        return null;
    }
  }

  /**
   * Check storage
   * @param key
   * @returns {boolean}
   */
  has(key: string) {
    return this.get(key) !== null;
  }

  /**
   * Get from storage
   * @param key
   * @param isObject
   * @returns {any}
   */
  get(key: string, isObject: boolean = false) {
    switch (this._service) {
      case 'cookie' :
        return this._getCookie(key, isObject);
      case 'localStorage' :
        break;
      default:
        return null;
    }
  }

  /**
   * Remove from storage
   * @param key
   * @returns {any}
   */
  remove(key: string) {
    switch (this._service) {
      case 'cookie' :
        return this._removeCookie(key);
      case 'localStorage' :
        break;
      default:
        return null;
    }
  }

  /**
   * Set storage service
   * @private
   */
  private _setStorageService() {
    if (document.cookie !== undefined) {
      this._service = 'cookie';
    } else if (localStorage !== undefined) {
      this._service = 'localStorage';
    }
  }

  /**
   * Set cookie
   * @param key
   * @param value
   * @param expDate
   * @returns {string}
   * @private
   */
  private _setCookie(key: string, value: any, expDate: number = 0) {
    const date = new Date();

    if (!expDate) {
      expDate = 1;
    }

    if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }

    date.setTime(date.getTime() + (expDate * 24 * 60 * 60 * 1000));

    return document.cookie = `${key}=${value}; expires=${date.toUTCString()}`;
  }

  /**
   * Get cookie
   * @param key
   * @param isObject
   * @returns {any}
   * @private
   */
  private _getCookie(key: string, isObject: boolean = false) {
    const cookieName = `${key}=`;
    const cookiesString = decodeURIComponent(document.cookie);
    const cookies = cookiesString.split(';');

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];

      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }

      if (!cookie.indexOf(cookieName)) {

        const cookieValue = cookie.substring(cookieName.length, cookie.length);

        return (isObject) ? JSON.parse(cookieValue) : cookieValue;
      }
    }

    return null;
  }

  /**
   * Remove cookie
   * @param key
   * @returns {string}
   * @private
   */
  private _removeCookie(key: string) {
    return this._setCookie(key, '', -1);
  }

}
