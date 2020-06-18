import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsModule } from './POC/products/products.module';
import { AuthComponent } from './POC/auth/auth.component';


const routes: Routes = [
  
  // {
  //   path: '',
  //   loadChildren: './POC/auth/auth.module#AuthModule'
  // },
  {
    path: '',
    loadChildren: './POC/products/products.module#ProductsModule'
  },
  {
    path:'auth',
    // loadChildren: './POC/auth/auth.module#AuthModule'
    component: AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
