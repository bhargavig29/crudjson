import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ProductsRoutingModule } from './products-routing.module';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsComponent } from './products.component';


@NgModule({
  declarations: [
    ProductsComponent, 
     ProductAddComponent, 
     ProductEditComponent, 
     ProductsListComponent
    ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
