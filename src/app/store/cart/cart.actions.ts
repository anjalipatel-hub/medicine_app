import { createAction, props } from '@ngrx/store';

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ medicine: any }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ medicineId: string }>()
);

export const increaseQuantity = createAction(
  '[Cart] Increase Quantity',
  props<{ medicineId: string }>()
);

export const decreaseQuantity = createAction(
  '[Cart] Decrease Quantity',
  props<{ medicineId: string }>()
);

export const clearCart = createAction('[Cart] Clear Cart');
