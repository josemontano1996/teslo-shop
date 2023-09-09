import { FC, ReactNode, useReducer } from 'react';
import { CartContext, cartReducer } from './';
import { ICartProduct } from '@/interfaces';

export interface CartState {
  cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
};

interface Props {
  children: ReactNode;
}

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  const addProductToCart = (product: ICartProduct) => {

    let productChanged = false;
    let productsInCart = state.cart.map((item) => {
      if (item._id === product._id && item.size === product.size) {
        item.quantity = item.quantity + product.quantity;
        productChanged = true;
        return item;
      }
      return item;
    });

    if (!productChanged) {
      productsInCart.push(product);
    }

    dispatch({ type: 'Cart-Update Products in Cart', payload: productsInCart });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
