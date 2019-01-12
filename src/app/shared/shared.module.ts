import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; //for tow way bindings [(ngModel)]
import { ReactiveFormsModule } from '@angular/forms';

import { ConvertToSpaces } from './convert-to-spaces.pipe';
import { RatingStar } from './star.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    ConvertToSpaces,
    RatingStar,
  ],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, ConvertToSpaces, RatingStar]
})
export class SharedModule { }
