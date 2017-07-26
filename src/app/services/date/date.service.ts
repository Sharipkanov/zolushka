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
            day: {
                id: parseInt(newDate[2], 0)
            },
            month: {
                id: parseInt(newDate[1], 0)
            },
            year: {
                id: parseInt(newDate[0], 0)
            }
        }
    }

    dateEncode(date: any) {
        let newDate = '';

        if (date.year && date.month && date.day) {
            newDate += (date.year.id) ? date.year.id : '0000';
            newDate += '-';
            newDate += (date.month.id < 10) ? '0' + date.month.id : date.month.id;
            newDate += '-';
            newDate += (date.day.id < 10) ? '0' + date.day.id : date.day.id;
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
