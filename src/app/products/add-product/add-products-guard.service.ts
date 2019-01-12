import { Injectable } from '@angular/core';
import { ActivatedRoute, CanDeactivate } from '@angular/router';
import { AddProductComponent } from './add-product.component';

@Injectable()

export class AddProductsGuardService implements CanDeactivate<AddProductComponent> {
    canDeactivate(addProductComponent: AddProductComponent) {
        if (addProductComponent.firstForm.dirty) {
            if(!confirm('Navgiate away and lose all Changes ? ')) {
                return false;
            }
        }
        return true;
    }
}