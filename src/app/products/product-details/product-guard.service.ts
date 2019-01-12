import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable()
export class ProductGuardService implements CanActivate {

  constructor(private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let productId = +route.url[1].path;
    if (isNaN(productId) || productId < 1) {
      alert('Product ID Not Vaild');
      this._router.navigate(['/products']);
      return false;
    }
    return true;
  }
}
