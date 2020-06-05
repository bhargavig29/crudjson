import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsModule } from './POC/products/products.module'
import { CommonService } from './POC/products/common.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductsModule
    
    ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
 