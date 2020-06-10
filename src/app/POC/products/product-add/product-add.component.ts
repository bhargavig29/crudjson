import { Component, OnInit, ViewChild } from '@angular/core';
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

  Colors: Array<any> = [
    { id:0 , name: 'White', value: 'white',isChecked:false},
    { id:1, name: 'Black', value: 'black' ,isChecked:false},
    { id:2 , name: 'Grey', value: 'grey',isChecked:false }
  ];

  // Colors: Array<any> = [
  //   {name:'Black'},
  //   {name:'White'},
  //   {name:'Grey'},
  // ];

  images: FormArray;

  constructor( private commonprodService : CommonService,
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
      'checkArray': this.fb.array([]),
      'images': this.fb.array([])
    })

  }


  onCheckboxChange(e) {
    const checkArray: FormArray = this.productsForm.get('checkArray') as FormArray;
  
    if (e.target.checked) {
      checkArray.push(new FormControl(parseInt(e.target.value)));
    } else {
      //let i: number = 0;
      checkArray.controls.forEach((item: FormControl, index) => {
        if (item.value == parseInt(e.target.value)) {
          checkArray.removeAt(index)
          return;
        }
        //i++;
      });
    }
  }
  // onCheckboxChange(name:string, isChecked: boolean) {
  //   const checkArray = <FormArray>this.productsForm.controls.checkArray;
  
  //   if(isChecked) {
  //     checkArray.push(new FormControl(name));
  //   } else {
  //     let index = checkArray.controls.findIndex(x => x.value == name)
  //     checkArray.removeAt(index);
  //   }
  // }

  onAddImages(){
    this.images = this.productsForm.get('images') as FormArray;
   
    this.images.push(
      this.fb.group({
        'url':''
      })
    );
  }
  onDeleteImage(index: number){
    (<FormArray>this.productsForm.get('images')).removeAt(index);
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
        checkArray: this.productsForm.value.checkArray,
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
