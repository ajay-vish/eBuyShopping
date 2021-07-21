import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxStripeModule } from 'ngx-stripe';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

//toasts
import {MatSnackBarModule} from '@angular/material/snack-bar';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { CartProductTemplateComponent } from './components/products/cart-product-template/cart-product-template.component';
import { OrderProgressComponent } from './components/products/order-progress/order-progress.component';
import { OrdersComponent } from './components/admin/orders/orders.component';
import { DatePipe } from '@angular/common';
import { ConfirmComponent } from './components/products/cart-template/confirm/confirm.component';
import { AdminProductTemplateComponent } from './components/admin/admin-product-template/admin-product-template.component';
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
    RegisterComponent,
    PaymentFormComponent,
    CartProductTemplateComponent,
    OrderProgressComponent,
    OrdersComponent,
    ConfirmComponent,
    AdminProductTemplateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatButtonModule,
    NgxStripeModule.forRoot('pk_test_QRFXZbbH9njd7BTCT4rPWlVA00HxnTuLnq'),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
