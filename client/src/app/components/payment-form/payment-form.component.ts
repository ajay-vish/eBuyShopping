import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StripeService, StripeCardComponent } from 'ngx-stripe';

import {
  StripeCardElementOptions,
  StripeElementsOptions,
  PaymentIntent,
  StripeCardElementChangeEvent 
} from '@stripe/stripe-js';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';

// import { environment as env } from '../../environments/environment';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css'],
})
export class PaymentFormComponent implements OnInit {
  stripeTest!: FormGroup;
  stripeCardValid: boolean = false;
  @ViewChild(StripeCardComponent) card!: StripeCardComponent ;

  cardOptions: StripeCardElementOptions = {
    iconStyle: 'solid',
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        },
       
      },
      
      // invalid: {
      //   iconColor: '#ffc7ee',
      //   color: '#ffc7ee'
      // }
    }
  };

  get validForm() {
    return this.stripeTest.valid && this.stripeCardValid;
  }

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private stripeService: StripeService,
    public authService:AuthService,
    public paymentService:PaymentService,
    
  ) {}

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      address: ['', [Validators.required]],
      amount: [1000, [Validators.required, Validators.pattern(/\d+/)]],
    });
  }

  // onChange({ type, event }:any) {
  //   console.log(type);
  //   console.log(event);
    
    
  //   if (type === 'change') {
  //     this.stripeCardValid = event.complete;
  //   }
  // }
  onChange(event: StripeCardElementChangeEvent) {
    const displayError = document.getElementById('card-errors')!;
    
    if (event.error) {
      displayError.textContent = event.error.message;
      this.stripeCardValid = false;
    } else {
      this.stripeCardValid = true;
    }
  }

  pay(): void {
    if (this.stripeTest.valid) {
      this.createPaymentIntent(this.stripeTest.get('amount')!.value)
        .pipe(
          switchMap((pi) =>
            this.stripeService.confirmCardPayment(pi.client_secret!, {
              payment_method: {
                card: this.card.element,
                billing_details: {
                  address: this.stripeTest.get('address')!.value,
                },
              },
            })
          )
        )
        .subscribe((result) => {
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message);
          } else {
            // The payment has been processed!
            if (result.paymentIntent!.status === 'succeeded') {
              // Show a success message to your customer

              console.log("Succeded !!!!!!!!!!!!!");
              console.log(result);

              //create the order
              console.log("Executing order now");
              

              //fetching products from cart from localstorage
              // TODO: find alternative way to get cart
              let products = JSON.parse(localStorage.getItem("cart")!)

              // removing the photo element from product object as it is not needed to save
              products.forEach((product:any) => {
                delete product.photo
              });
              console.log(products);
              
              let orderData = {
                payment_id: result.paymentIntent!.id,
                amount: (result.paymentIntent!.amount)/100,
                products:products,
                address: this.stripeTest.get('address')!.value,

              }

              //fetching user, token from authservice
              let {user,token} = this.authService.getSignedInUser()

              //creating order
              this.paymentService.createOrder(user._id,orderData,token).subscribe((resp:any)=>{
                console.log(resp);
                if(resp.success){
                  alert("Order placed successfully!!!")
                  console.log("Order placed successfully!!!");
                }
                
              })

              
              
            }
          }
        });
    } else {
      console.log(this.stripeTest);
    }
  }

  createPaymentIntent(amount: number): Observable<PaymentIntent> {
    return this.http.post<PaymentIntent>(
      `http://localhost:8000/api/create-payment-intent`,
      { amount }
    );
  }
}