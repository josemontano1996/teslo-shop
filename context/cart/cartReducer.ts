import { CartState } from '.';
import { ICartProduct } from '@/interfaces';

type CartActionType =
  | { type: 'Cart-LoadCart from cookies | storage'; payload: ICartProduct[] }
  | { type: 'Cart-Update Products in Cart'; payload: ICartProduct[] }
  | { type: 'Cart-Change product quantity'; payload: ICartProduct }
  | { type: 'Cart-Remove product'; payload: ICartProduct }
  | {
      type: 'Cart-Update order summary';
      payload: {
        numberOfItems: number;
        subTotal: number;
        tax: number;
        total: number;
      };
    };

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
  switch (action.type) {
    case 'Cart-LoadCart from cookies | storage':
      return {
        ...state,
        cart: action.payload,
      };
    case 'Cart-Update Products in Cart':
      return {
        ...state,
        cart: [...action.payload],
      };
    case 'Cart-Change product quantity':
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id === action.payload._id && product.size === action.payload.size) {
            return {
              ...product,
              quantity: action.payload.quantity,
            };
          }
          return product;
        }),
      };
    case 'Cart-Remove product':
      return {
        ...state,
        cart: state.cart.filter(
          (p) => !(p._id === action.payload._id && p.size === action.payload.size)
        ),
      };
    case 'Cart-Update order summary':
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
