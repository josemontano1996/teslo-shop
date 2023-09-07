import { CartState } from '.';
import { ICartProduct } from '@/interfaces';

type CartActionType =
  | { type: 'Cart-LoadCart from cookier | storage'; payload: ICartProduct[] }
  | { type: 'Cart-Add Product'; payload: ICartProduct };

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
  switch (action.type) {
    case 'Cart-LoadCart from cookier | storage':
      return {
        ...state,
      };
    default:
      return state;
  }
};
