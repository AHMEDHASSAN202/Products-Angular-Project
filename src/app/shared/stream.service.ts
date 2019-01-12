import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()

export class StreamService {
    streamData: Observable<string>;

    createStream() {
        this.streamData = new Observable(stream => {
            setTimeout(()=>{
                stream.next('value1');
            }, 3000);
            setTimeout(function() {
                stream.next('value2');
            }, 4000);
            setTimeout(()=>{
                stream.next('value3');
            }, 5000);
            setTimeout(()=>{
                stream.complete();
            }, 6000);
        });

        return this.streamData;
    }
}