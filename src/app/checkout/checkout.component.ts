import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription, take } from 'rxjs';
import { MedicineService } from '../Services/medicine.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { CartItem } from '../store/cart/cart.model';
import { selectCartItems, selectCartTotal } from '../store/cart/cart.selectors';
import { decreaseQuantity, increaseQuantity } from '../store/cart/cart.actions';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Medicine } from '../../interfaces/medicine';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatIconModule, MatTooltipModule, HttpClientModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  providers: [MedicineService]
})
export class CheckoutComponent {
  cart: any[] = [];
  patientId: string | null = null;
  cartItems$: Observable<CartItem[]>;
  totalPrice$: Observable<number>;
  data: any;
  item1: any;

  constructor(private router: Router, private store: Store, private snackBar: MatSnackBar, private medicineService: MedicineService, private route: ActivatedRoute,) {
    this.cartItems$ = this.store.select(selectCartItems);
    this.totalPrice$ = this.store.select(selectCartTotal);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.patientId = params['patientId'];
      this.data = params['patientDetails'];
    });
  }

  calculateTotalPrice(cart: { id: string, medicine: any, quantity: number }[]): number {
    return cart.reduce((total, item) => total + item.medicine.mrp * item.quantity, 0);
  }
  increaseQuantity(item: CartItem) {
    this.store.dispatch(increaseQuantity({ medicineId: item.medicine.id }));
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      this.store.dispatch(decreaseQuantity({ medicineId: item.medicine.id }));
    } else {
      this.snackBar.open('Cannot decrease below 1', 'Close', {
        duration: 2000,
      });
    }
  }
  onPlaceOrder(item: CartItem) {
    this.cartItems$.pipe(take(1)).subscribe(cartItems => {
      if (cartItems.length > 0) {
        this.item1 = cartItems.map(item => ({
          medicine_id: item.medicine.medicine_id,
          quantity: item.quantity
        }));
      }
    })
    const orderPayload = {
      patient_id: this.patientId,
      items: this.item1,
      delivery_type: 'delivery',
      state: 'gujarat',
      city: 'ahmedabad',
      patient_name: this.data?.first_name,
      mobile: this.data?.mobile,
      full_address: {
        full_address: '382415'
      }
    };
    this.medicineService.placeOrder(orderPayload).subscribe(
      (response) => {
        if (response.status_code == 0) {
          this.snackBar.open(response.status_message || 'Operation completed.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        }
        this.snackBar.open('Order Placed Successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/']);
      });

  }
}
