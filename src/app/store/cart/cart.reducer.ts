import { Action, createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { CartState } from './cart.model';

const initialState: CartState = {
  items: [], // Start with an empty items array
};

// Create the reducer
const cartReducer = createReducer(
  initialState,
  on(CartActions.addToCart, (state, { medicine }) => {
    const existingItem = state.items.find(item => item.medicine.id === medicine.id);
    
    if (existingItem) {
      // If the item already exists in the cart, update its quantity
      return {
        ...state,
        items: state.items.map(item =>
          item.medicine.id === medicine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    } else {
      // If the item is new, add it to the cart with a quantity of 1
      return {
        ...state,
        items: [...state.items, { medicine, quantity: 1 }],
      };
    }
  }),
  on(CartActions.removeFromCart, (state, { medicineId }) => ({
    ...state,
    items: state.items.filter(item => item.medicine.id !== medicineId),
  })),
  on(CartActions.increaseQuantity, (state, { medicineId }) => ({
    ...state,
    items: state.items.map(item =>
      item.medicine.id === medicineId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ),
  })),
  on(CartActions.decreaseQuantity, (state, { medicineId }) => ({
    ...state,
    items: state.items.map(item =>
      item.medicine.id === medicineId
        ? { ...item, quantity: Math.max(item.quantity - 1, 0) } // Prevent negative quantity
        : item
    ).filter(item => item.quantity > 0) // Remove items with quantity 0
  }))
);

export function reducer(state: CartState | undefined, action: Action) {
  return cartReducer(state, action);
}
