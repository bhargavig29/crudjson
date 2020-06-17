import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsModule } from './POC/products/products.module';


const routes: Routes = [
  
  // {
  //   path: '',
  //   loadChildren: './POC/auth/auth.module#AuthModule'
  // },
  {
    path: '',
    loadChildren: './POC/products/products.module#ProductsModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
