import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../products.service';
import { v4 as uuid } from 'uuid';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { CommonService } from '../common.service';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  
  products: any;

  imageSrc: string;

  display = ['Yes', 'No'];

  status = ['Available', 'Limited', 'Unavailable'];

  productsForm: FormGroup;

  images: FormArray;

  constructor(private prodService: ProductService,
    private commonprodService : CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) {

    this.productsForm = this.fb.group({
      'name': ['', [Validators.required, Validators.minLength(3)]],
      'description': ['', Validators.required],
      'price': ['', [Validators.required, Validators.pattern('[1-9]+[0-9]*$')]],
      'image': ['', [Validators.required]],
      'fileSource': ['', [Validators.required]],
      'display': ['Yes',[Validators.required]],
      'status': ['Available',[Validators.required]],
      'images': this.fb.array([])
    })
  }

  onAddImages(){
    this.images = this.productsForm.get('images') as FormArray;
   
    this.images.push(
      this.fb.group({
        'url':''
      })
    );
  }

  get f() {

    return this.productsForm.controls;
  }

  get controls() {
    return (<FormArray>this.productsForm.get('images')).controls;
  }
  
  ngOnInit() {
    
    this.getproducts();
    console.log(this.products);

  }
  getproducts(){
    this.commonprodService.getProducts().subscribe((response)=>{
      this.products = response
    })

  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;

        this.productsForm.patchValue({
          fileSource: reader.result
        });

      };

    }
  }


  onSubmit() {

    if (this.productsForm.value) {

      let newProducts = {
        id: uuid(),
        name: this.productsForm.value.name,
        description: this.productsForm.value.description,
        price: this.productsForm.value.price,
        image: this.productsForm.value.fileSource,
        display: this.productsForm.value.display,
        status: this.productsForm.value.status,
        images: this.productsForm.value.images
      }

      console.log(newProducts);

     // this.products.push(newProducts);
      this.commonprodService.addProduct(newProducts).subscribe((response)=>{
        this.getproducts();
        console.log("Product Added Successfully")
        this.router.navigate(['products']);
      })
      
    }

  }
 
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  // onReset() {
  //  this.productsForm.reset();
  // }

}
