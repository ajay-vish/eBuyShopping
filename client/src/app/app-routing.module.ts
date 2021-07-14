import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin/admin.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { HomeComponent } from './components/user/home/home.component';
import { CreateCategoryComponent } from './components/admin/create-category/create-category.component';
import { CreateProductComponent } from './components/admin/create-product/create-product.component';
import { EditCategoryComponent } from './components/admin/edit-category/edit-category.component';
import { EditProductComponent } from './components/admin/edit-product/edit-product.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/user/cart/cart.component';
import { ProductPageComponent } from './components/products/product-page/product-page.component';
import { DisplayProductComponent } from './components/products/display-product/display-product.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'product', component: ProductPageComponent },
  { path: 'product/:id', component: DisplayProductComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'create-product', component: CreateProductComponent },
  { path: 'create-category', component: CreateCategoryComponent },
  { path: 'edit-product/:id', component: EditProductComponent },
  { path: 'edit-category/:id', component: EditCategoryComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
