import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CallAPIService {
    constructor(private _http: Http) {}

    callAPI() {
        return this._http.get('https://jsonplaceholder.typicode.com/posts')
                         .map(result=>result.json());
    }
}