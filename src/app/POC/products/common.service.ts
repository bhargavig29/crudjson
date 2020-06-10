import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CommonService {
  products: any;

  
  private apiServer = "http://localhost:3000";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http:HttpClient) { }

  addProduct(product){
    return this.http.post(this.apiServer + '/products/',JSON.stringify(product), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )

  }
  
  getProducts(){
    return this.http.get(this.apiServer + '/products/').pipe(
      catchError(this.errorHandler)
    );
  }

  getProductById(id){
    return this.http.get(this.apiServer + '/products/' + id).pipe(
      catchError(this.errorHandler)
    )
  }

  updateProduct(product){
    return this.http.put(this.apiServer + '/products/'  +product.id,product,this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }
 
  
  deleteProduct(product){
    return this.http.delete(this.apiServer + '/products/'  +product.id,this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }


}
