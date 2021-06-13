import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/user/home/home.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { CartComponent } from './components/user/cart/cart.component';
import { ProductTemplateComponent } from './components/products/product-template/product-template.component';
import { CartTemplateComponent } from './components/products/cart-template/cart-template.component';
import { NavbarComponent } from './components/user/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    CartComponent,
    ProductTemplateComponent,
    CartTemplateComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
