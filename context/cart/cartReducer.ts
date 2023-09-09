import { CartState } from '.';
import { ICartProduct } from '@/interfaces';

type CartActionType =
  | { type: 'Cart-LoadCart from cookier | storage'; payload: ICartProduct[] }
  | { type: 'Cart-Update Products in Cart'; payload: ICartProduct[] };

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
  switch (action.type) {
    case 'Cart-LoadCart from cookier | storage':
      return {
        ...state,
      };
    case 'Cart-Update Products in Cart':
      return {
        ...state,
        cart: [...action.payload],
      };
    default:
      return state;
  }
};
