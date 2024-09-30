import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState, CartItem } from './cart.model';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state: CartState) => state.items
);

export const selectCartTotal = createSelector(
  selectCartItems,
  (items: CartItem[]) => items.reduce((total, item: CartItem) => total + (item.medicine.mrp * item.quantity), 0)
);
