import { Component, OnInit } from '@angular/core';
import { Products } from '../products-interface';
import { ProductsService } from '../products.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
  providers: [ProductsService]
})
export class ProductsListComponent implements OnInit {

  title_panel: string = "Products List";
  products: any;
  show: boolean = true;
  _listFilter: string;
  filterdProducts: Products[];

  constructor(private _products: ProductsService, 
              private _router: Router,
              private _activetdRoute: ActivatedRoute ) {}

  get listFilter() :string{
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filterdProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  performFilter(filterBy: string): Products[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter(
                (product: Products) => 
                    product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1
                );
  }

  onRatingClicked(str: string) {
    this.title_panel = `Product List : ${str}`; 
  }

  ngOnInit() {
    this._products.getProducts().subscribe(
      (products) => {
        this.products = products;
        this.filterdProducts = this.products;
      },
      error => console.log('error'),
      () => console.log('Done..')
    );
            
    this.listFilter = this._activetdRoute.snapshot.queryParamMap.get('filterBy') || '';
    if (this._activetdRoute.snapshot.queryParamMap.get('showImage')) {
      this.show = this._activetdRoute.snapshot.queryParamMap.get('showImage') === 'true';
    } 
    console.log(`List filer is : ${this.listFilter}`);
  }

  redirectDetails(id: number) {
    this._router.navigate(['/product', id],{
            queryParams: {filterBy: this.listFilter, showImage: this.show}  
          });
  }
}
