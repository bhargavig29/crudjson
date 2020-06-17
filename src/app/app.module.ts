import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsModule } from './POC/products/products.module'
import { CommonService } from './POC/products/common.service';
import { AuthModule } from './POC/auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductsModule,
    AuthModule,
    NgbModule
    
    ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
 