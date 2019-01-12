import { Component, OnInit } from '@angular/core';
import { StreamService } from '../shared/stream.service';
import { CallAPIService } from '../shared/api.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [StreamService, CallAPIService]
})
export class HeaderComponent implements OnInit {

  private brand: string;

  constructor(private _streamData: StreamService, private _callAPI: CallAPIService) { }

  ngOnInit() {
    this.brand = 'new app';
  }

  getDataStream() {
    this._streamData.createStream().subscribe(
                                  stream => {
                                    console.log(stream);
                                  },
                                error => {
                                  console.log(error);
                                },
                              () => {
                                console.log('Done Stream..');
                              })
  }

  getCallAPI() {
    this._callAPI.callAPI().subscribe(
      value=>{
        console.log(value);
      },
      error=>{
        console.log(error);
      },
      ()=>{
        console.log('Done!');
      }
    );
  }
}
