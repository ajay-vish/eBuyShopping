import { Component, OnInit, Inject, ViewChild, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
  PaymentIntent,
  StripeCardElementChangeEvent,
} from '@stripe/stripe-js';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';
import { Router } from '@angular/router';

// import { environment as env } from '../../environments/environment';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css'],
})
export class PaymentFormComponent implements OnInit {
  stripeTest!: FormGroup;
  stripeCardValid: boolean = false;
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

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
          color: '#CFD7E0',
        },
      },
    },
  };

  get validForm() {
    return this.stripeTest.valid && this.stripeCardValid;
  }

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  isLoading=false;
  constructor(
    private router:Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private stripeService: StripeService,
    public authService: AuthService,
    public paymentService: PaymentService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PaymentFormComponent>
  ) {}

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      address: ['', [Validators.required]],
      amount: [
        this.data.amount,
        [Validators.required, Validators.pattern(/\d+/)],
      ],
    });
  }
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
    this.isLoading=true
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
          } else {
            // The payment has been processed!
            if (result.paymentIntent!.status === 'succeeded') {
              // Show a success message to your customer

              //create the order

              //fetching products from cart from localstorage
              // TODO: find alternative way to get cart
              let products = JSON.parse(localStorage.getItem('cart')!);

              // removing the photo element from product object as it is not needed to save
              products.forEach((product: any) => {
                delete product.photo;
              });

              let orderData = {
                payment_id: result.paymentIntent!.id,
                amount: result.paymentIntent!.amount / 100,
                products: products,
                address: this.stripeTest.get('address')!.value,
              };

              //fetching user, token from authservice
              let { user, token } = this.authService.getSignedInUser();

              //creating order
              this.paymentService
                .createOrder(user._id, orderData, token)
                .subscribe((resp: any) => {

                  if (resp.success) {

                    localStorage.removeItem('cart');
                    this.dialogRef.close();
                    this.snackBar.open('Your order is placed successfully!!👍', 'close', {
                      duration: 2000,
                      panelClass: ['success-snackbar'],
                      horizontalPosition: 'center',
                      verticalPosition: 'top',
                    });

                    this.router.navigate(['/order']);

                  }

                  else{
                    this.snackBar.open(resp.error, 'close', {
                      duration: 2000,
                      panelClass: ['error-snackbar'],
                      horizontalPosition: 'center',
                      verticalPosition: 'top',
                    });
                  }
                });
            }
          }
        });
    } else {
    }
  }

  createPaymentIntent(amount: number): Observable<PaymentIntent> {
    return this.http.post<PaymentIntent>(
      `http://localhost:8000/api/create-payment-intent`,
      { amount }
    );
  }
}
