import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/user/home/home.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { CartComponent } from './components/user/cart/cart.component';
import { ProductTemplateComponent } from './components/products/product-template/product-template.component';
import { CartTemplateComponent } from './components/products/cart-template/cart-template.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductPageComponent } from './components/products/product-page/product-page.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { CreateProductComponent } from './components/admin/create-product/create-product.component';
import { CreateCategoryComponent } from './components/admin/create-category/create-category.component';
import { EditProductComponent } from './components/admin/edit-product/edit-product.component';
import { EditCategoryComponent } from './components/admin/edit-category/edit-category.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DisplayProductComponent } from './components/products/display-product/display-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    CartComponent,
    ProductTemplateComponent,
    CartTemplateComponent,
    NavbarComponent,
    ProductPageComponent,
    DisplayProductComponent,
    AdminComponent,
    CreateProductComponent,
    CreateCategoryComponent,
    EditProductComponent,
    EditCategoryComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
