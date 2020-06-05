import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  headers = ["name","description","price","image","status"];

  products ;

  constructor(private prodService : ProductService,
    private commonprodService: CommonService) { }

  ngOnInit() {
    this.getProducts();
  
  }

  getProducts(){

    this.commonprodService.getProducts().subscribe((response)=>{
      this.products = response
      console.log(this.products);
    });
    
  }

  deleteProduct(product){
    this.commonprodService.deleteProduct(product).subscribe(()=>{
      this.getProducts();
    })

  }
}
