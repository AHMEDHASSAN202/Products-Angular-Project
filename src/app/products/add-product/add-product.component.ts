import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { Products } from '../products-interface';

//custom validation
function ratingRange(formControl: AbstractControl) : {[key: string]: boolean} | null {
  if (formControl.value !== undefined 
      && (isNaN(formControl.value)
      || formControl.value < 1
      || formControl.value > 5)) {
        return {'range': true};
      }
  return null;
}

//custom valdation by paramter
function ratingRange2(min: number, max: number) : ValidatorFn {
  return (formControl: AbstractControl) : {[key: string]: boolean} | null => {
    if (formControl.value !== undefined
       && (isNaN(formControl.value)
       || formControl.value < min
       || formControl.value > max)) {
         return {'range': true};
       }
       return null;
  }
}

//check password is match confirm password
function passwordMatcher(formGroup: AbstractControl) : {[key: string]: boolean} | null {
  let password = formGroup.get('password');
  let confirmPassword = formGroup.get('confirmPassword');
  if (password.pristine || confirmPassword.pristine) {
    return null;
  }
  if (password.value === confirmPassword.value) {
    return null;
  }
  return {'match': true};
}


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {

  firstForm: FormGroup;
  emailMessagesErrors: string ;

  get extraInfo(): FormArray {
    return <FormArray>this.firstForm.get('extraInfo');
  }

  private emailRoles = {
    required: 'please enter your email adderss',
    pattern: 'invalid email!'
  }

  sub: Subscription;

  constructor(private _formBuilder: FormBuilder,
              private _route: ActivatedRoute,
              private _products: ProductsService) { }

  ngOnInit() {
    // this.firstForm = new FormGroup({
    //   username: new FormControl(),
    //   email: new FormControl(),
    //   password: new FormControl(),
    //   checkbox: new FormControl(false)    //true is defualt value for checkbox field 
    // });
    this.firstForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      pass: this._formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      }, {validator: passwordMatcher}),
      phone: [''],
      rating: ['', ratingRange2(1,5)],
      sendNotifications: 'email',
      sendCatalog: false,
      extraInfo: this._formBuilder.array([ this.builderExtraInfo() ])
    });

    this.firstForm.get('sendNotifications')
                  .valueChanges.subscribe(
                    value => this.setValidationPhoneInput(value)
                  );

    const emailInput = this.firstForm.get('email');              
    this.firstForm.get('email')
                  .valueChanges.subscribe(
                    value => this.setEmailErrors(emailInput)
                  );            

    //read the product id from the route parametar
    this.sub = this._route.params.subscribe(
      params => {
        let id = +params['id'];
      }
    )

  }

  builderExtraInfo(): FormGroup {
    return this._formBuilder.group({
      addressType: 'home',
      streetAddress1: [''],
      streetAddress2: [''],
      city: [''],
      status: [''],
      zipCode: ['']
    });
  }

  addAddress(): void {
    this.extraInfo.push(this.builderExtraInfo());
  }

  submit() {
    console.log(this.firstForm.controls.email);
  }

  testData(): void {
    this.firstForm.patchValue({
      username: 'Ahmed Hassan',
      email: 'ahmed@gmail.com',
      password: "ahme1936$#%",
      checkbox: true
    });
  }

  resetForm(): void {
    this.firstForm.reset();
  }

  //Set Vaildation for Phone Input
  setValidationPhoneInput(notifyVia: string) :void {
    const phoneControl = this.firstForm.get('phone');
    if (notifyVia === 'text') {
      phoneControl.setValidators([Validators.required]);
    }else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

  setEmailErrors(emailInput: AbstractControl): void {
    this.emailMessagesErrors = '';
    if ((emailInput.touched || emailInput.dirty) && emailInput.errors) {
      this.emailMessagesErrors = Object.keys(emailInput.errors).map(
        key => this.emailRoles[key]
      ).join(' ');
    }
  }

  getProduct(id: number) {
    let product: Products;
    this._products.getProducts().subscribe(
      (data) => {
        product = data[id-1];
      });
  }
}
