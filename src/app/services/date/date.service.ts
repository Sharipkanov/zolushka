import { Injectable } from '@angular/core';
import { reject } from 'q';
import { Http } from '@angular/http';

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

        newDate += date.year;
        newDate += '-' + date.month;
        newDate += '-' + date.day;

        return newDate;
    }

    getDatePicker() {
        return this._http.get('./assets/json/date_picker.json')
            .map(res => res.json());
    }
}
