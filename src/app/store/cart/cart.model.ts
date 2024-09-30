import { Medicine } from "../../../interfaces/medicine";


export interface CartItem {
  medicine: Medicine;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}
