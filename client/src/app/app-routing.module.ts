import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayProductComponent } from './components/products/display-product/display-product.component';
import { ProductPageComponent } from './components/products/product-page/product-page.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { HomeComponent } from './components/user/home/home.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'product', component: ProductPageComponent },
  { path: 'product/:id', component: DisplayProductComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'create-product', component: CreateProductComponent },
  { path: 'create-category', component: CreateCategoryComponent },
  { path: 'edit-product/:id', component: EditProductComponent },
  { path: 'edit-category/:id', component: EditCategoryComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
