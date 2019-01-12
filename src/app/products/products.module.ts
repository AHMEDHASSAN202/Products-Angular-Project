import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


//products
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductGuardService } from './product-details/product-guard.service';
import { AddProductComponent } from './add-product/add-product.component';
import { SharedModule } from '../shared/shared.module';
import { ProductsService } from './products.service';
import { AddProductsGuardService } from './add-product/add-products-guard.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot([
      {
        path: 'products',
        component: ProductsListComponent
      },
      {
        path: 'product/:id',
        canActivate: [ ProductGuardService ],
        component: ProductDetailsComponent
      },
      {
        path: 'add-product/:id',
        component: AddProductComponent,
        canDeactivate: [ AddProductsGuardService ]
      }
    ]),
  ],
  declarations: [
    ProductsListComponent,
    ProductDetailsComponent,
    AddProductComponent
  ],
  providers: [ ProductGuardService, ProductsService, AddProductsGuardService ],
})
export class ProductsModule { }
