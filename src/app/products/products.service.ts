import { Injectable } from '@angular/core';
import { Products } from './products-interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
 

@Injectable()
export class ProductsService {
    
  productsUrl:string = 'assets/api/products.json';
  product: Products;

  constructor(private _http: HttpClient) {}

  getProducts() {
    return this._http.get(this.productsUrl, {responseType: 'json'});
  }

  test() {
    // return Observable.create((observer) => {
    //   // for(let i = 0; i < 100; i++) {
    //   //   observer.next(`${i}`);
    //   // }
    //   observer.interval(100);
    //   observer.complete()
    // })
    //return RX.Observable.interval(100);
  }

}