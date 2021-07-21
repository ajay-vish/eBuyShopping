import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin/admin.component';
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

import { AuthGuardService as AuthGaurd } from './services/auth-gaurd.service';
import { AdminAuthGaurdService as AdminAuthGaurd } from './services/admin-auth-gaurd.service';
import { CartTemplateComponent } from './components/products/cart-template/cart-template.component';
import { OrdersComponent } from './components/admin/orders/orders.component';
import { DisplayProductsByCategoryComponent } from './components/products/display-products-by-category/display-products-by-category.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'product', component: ProductPageComponent },
  { path: 'product/:id', component: DisplayProductComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminAuthGaurd] },
  {
    path: 'create-product',
    component: CreateProductComponent,
    canActivate: [AdminAuthGaurd],
  },
  {
    path: 'create-category',
    component: CreateCategoryComponent,
    canActivate: [AdminAuthGaurd],
  },
  {
    path: 'edit-product/:id',
    component: EditProductComponent,
    canActivate: [AdminAuthGaurd],
  },
  {
    path: 'edit-category/:id',
    component: EditCategoryComponent,
    canActivate: [AdminAuthGaurd],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  { path: 'view/:category-name', component: DisplayProductsByCategoryComponent },
  { path: 'order', component: CartTemplateComponent, canActivate: [AuthGaurd] },
  { path: 'orders', component: OrdersComponent, canActivate: [AdminAuthGaurd] },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
