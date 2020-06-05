import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CommonService {
  products: any;

  constructor(private http:HttpClient) { }

  addProduct(product){
    return this.http.post("http://localhost:3000/products",product);

  }

  getProducts(){
    return this.http.get("http://localhost:3000/products");
  }

  getProductById(id){
    return this.http.get("http://localhost:3000/products/"+id)
  }

  updateProduct(product){
    return this.http.put("http://localhost:3000/products/" +product.id,product)
  }
 
  
  deleteProduct(product){
    return this.http.delete("http://localhost:3000/products/" +product.id)
  }




}
