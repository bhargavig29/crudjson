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
    let prodImages = new FormArray([]);

    this.products = this.commonprodService.getProductById(this.id).subscribe((data) => {
      this.prod = data

      this.imageSrc = this.prod.image

      prodName = this.prod.name;
      prodDesc = this.prod.description;
      prodPrice = this.prod.price;
      prodDisplay = this.prod.display;
      prodStatus = this.prod.status;
      if (this.prod['images']) {
        for (let imageUrls of this.prod.images) {
          prodImages.push(
              this.fb.group({
                'url': (imageUrls.url)

              })
          );
        }
        console.log(prodImages)
      }
      this.productsForm = this.fb.group({
        'name': [prodName, [Validators.required, Validators.minLength(3)]],
        'description': [prodDesc, Validators.required],
        'price': [prodPrice, [Validators.required, Validators.pattern('[1-9]+[0-9]*$')]],
        'image': [prodImage],
        'fileSource': [''],
        'display': [prodDisplay, [Validators.required]],
        'status': [prodStatus, [Validators.required]],
        'images': prodImages
      });
      console.log(this.productsForm)
    })
  }

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
