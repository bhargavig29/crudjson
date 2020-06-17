import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products.service';
import { CommonService } from '../common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
 
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {


  SearchText: string;

  headers = ["name","description","price","image","status","date"];

  products ;
  searchableList: any;

  constructor(private prodService : ProductService,
    private commonprodService: CommonService,
    private modalService: NgbModal) {
      this.searchableList = this.products;
     }

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
  openModal(targetModal, product) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
}
}
