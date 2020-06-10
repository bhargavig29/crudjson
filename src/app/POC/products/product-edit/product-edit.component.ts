import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, Form } from '@angular/forms';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productsForm: FormGroup;

  prod;
  id;

  display = ['Yes', 'No'];

  status = ['Available', 'Limited', 'Unavailable'];

  products: any;

  Colors: Array<any> = [
    { id:0 , name: 'White', value: 'white',isChecked:false },
    { id:1, name: 'Black', value: 'black',isChecked:false },
    { id:2 , name: 'Grey', value: 'grey',isChecked:false }
  ];

  // Colors: Array<any> = [
  //   {name:'Black'},
  //   {name:'White'},
  //   {name:'Grey'},
  // ];
  
  images: FormArray;

  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private commonprodService: CommonService
  ) { }

  imageSrc: string;

  private initForm() {

    let prodName = '';
    let prodDesc = '';
    let prodPrice = '';
    let prodImage = '';
    let prodDisplay = '';
    let prodStatus = '';
    let prodcheck = [];
    let prodImages = new FormArray([]);

    this.products = this.commonprodService.getProductById(this.id).subscribe((data) => {
      this.prod = data
      console.log(this.prod)


      this.imageSrc = this.prod.image

      prodName = this.prod.name;
      prodDesc = this.prod.description;
      prodPrice = this.prod.price;
      prodDisplay = this.prod.display;
      prodStatus = this.prod.status;
      prodcheck = this.prod.checkArray;
      console.log(prodcheck)
      console.log(this.Colors)

      for(var i = 0; i<this.Colors.length;i++) {
        let id=this.Colors[i].id;
        if(prodcheck.includes(id))
        {
          this.Colors[i].isChecked = true;

        }
        else {
          this.Colors[i].isChecked = false;
        }
      }
      console.log(this.Colors);  
      if (this.prod['images']) {
        for (let imageUrls of this.prod.images) {
          prodImages.push(
              this.fb.group({
                'url': (imageUrls.url)
              })
          );
        }
        console.log(prodImages);
      }
      this.productsForm = this.fb.group({
        'name': [prodName, [Validators.required, Validators.minLength(3)]],
        'description': [prodDesc, Validators.required],
        'price': [prodPrice, [Validators.required, Validators.pattern('[1-9]+[0-9]*$')]],
        'image': [prodImage],
        'fileSource': [''],
        'display': [prodDisplay, [Validators.required]],
        'status': [prodStatus, [Validators.required]],
        'checkArray': this.fb.array(prodcheck),
        'images': prodImages
      });
      // console.log(this.productsForm.value.checkArray)
      console.log(this.productsForm)
    })
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.productsForm.get('checkArray') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(parseInt(e.target.value)));
    } else {
      checkArray.controls.forEach((item: FormControl, index) => {
        if (item.value == parseInt(e.target.value)) {
          checkArray.removeAt(index);
          return;
        }
      });
    }
  }
//   onCheckboxChange(name:string, isChecked: boolean) {
//   const checkArray = <FormArray>this.productsForm.controls.checkArray;

//   if(isChecked) {
//     checkArray.push(new FormControl(name));
//   } else {
//     let index = checkArray.controls.findIndex(x => x.value == name)
//     checkArray.removeAt(index);
//   }
// }
  onAddImages() {
    this.images = this.productsForm.get('images') as FormArray;
    console.log(this.images,typeof(this.productsForm.get('images')))
    this.images.push(
      this.fb.group({
        'url': ''
      })
    );
    console.log(this.images)
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


  getProducts() {
    this.commonprodService.getProducts().subscribe((response) => {
      this.products = response
    })
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.initForm();

  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length > 0) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;
        //document.getElementById("preview").setAttribute("src", this.imageSrc)

        this.productsForm.patchValue({
          fileSource: reader.result
        });

      };

    }
  }

  onSubmit() {

    if (this.productsForm.value) {

      console.log(this.productsForm.value);
      this.productsForm.value.image = this.imageSrc

      let updatedProduct = {
        id: this.prod.id,
        ...this.productsForm.value
      }
      console.log(updatedProduct);
      this.commonprodService.updateProduct(updatedProduct).subscribe(() => {
        this.getProducts();
        console.log("Product Updated Successfully")
        this.router.navigate(['products']);
      });

    }

  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

}
