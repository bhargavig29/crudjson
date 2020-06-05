import { Injectable } from '@angular/core';
import { Init } from './product-init';

@Injectable({
    providedIn: 'root',
  })
export class ProductService  {
  products=[];

  constructor() {
    // super();
    // console.log('ProductService Works');
    //  this.load();
     //private products =
     this.products = this.getProducts() 
   }

   getProducts() {
     let prod=[];
      if (localStorage.getItem('products') !== null && localStorage.getItem('products') !== undefined) {
       prod = JSON.parse(localStorage.getItem('products'));
      }
      return prod;
   }
   saveProducts() {
    localStorage.setItem('products', JSON.stringify(this.products));
   }

   addProduct(newProd) {
    this.products = this.getProducts()
    this.products.push(newProd);
    this.saveProducts()
 }

   deleteProduct(id) {
     this.products = this.getProducts()
     for(let i = 0; i <this.products.length; i++) {
      if(this.products[i].id == id) {
        this.products.splice(i, 1);
      }
   }
      this.saveProducts()
   }

     updateProduct(newProd){ this.products = this.getProducts();
      //console.log(newProd);

     for(let i = 0; i <this.products.length; i++) {
      if(this.products[i].id == newProd.id) {
        this.products[i] = newProd;
        console.log(this.products[i])
      }
   }
   //console.log(this.products)
      this.saveProducts()
   }


   

}