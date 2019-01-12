import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(
              private _activatedRoute: ActivatedRoute,
              private _router: Router
              ) { }

  ngOnInit() {
    console.log(this._activatedRoute.snapshot.paramMap.get('id'));
  }

  redirectProducts() {
    this._router.navigate(['/products'], {
      queryParamsHandling: 'preserve'
    });
  }
}
