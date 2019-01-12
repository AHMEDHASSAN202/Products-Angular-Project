import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsModule } from './products/products.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
import { HeaderRedColorDirective } from './header/directives/header-red-color.directive';
import { WelcomeComponent } from './welcome.component';
import { componentFactoryName } from '@angular/compiler';
import { NotfoundComponent } from './notfound/notfound/notfound.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderRedColorDirective,
    WelcomeComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'welcome',
        component: WelcomeComponent
      },
      {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'
      },
      {
        path: '**',
        component: NotfoundComponent,
        pathMatch: 'full'
      }
    ]),
    ProductsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
