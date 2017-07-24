import {Injectable} from '@angular/core';
import {reject} from 'q';
import {Http} from '@angular/http';

@Injectable()
export class DateService {

    constructor(private _http: Http) {
    }

    dateDecode(date: string) {
        const newDate = date.split('-');

        return {
            day: newDate[2],
            month: newDate[1],
            year: newDate[0]
        }
    }

    dateEncode(date: any) {
        let newDate = '';

        if (date.year && date.month && date.day) {
            newDate += (date.year) ? date.year : '0000';
            newDate += '-';
            newDate += (date.month < 10) ? '0' + date.month : date.month;
            newDate += '-';
            newDate += (date.day < 10) ? '0' + date.day : date.day;
        } else {
            newDate = null;
        }

        return newDate;
    }

    getDatePicker() {
        return this._http.get('./assets/json/date_picker.json')
            .map(res => res.json());
    }
}
