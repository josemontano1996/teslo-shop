import { FC, ReactNode, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';
import { CartContext, cartReducer } from './';
import { ICartProduct } from '@/interfaces';

export interface CartState {
  cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
  cart: Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [],
};

interface Props {
  children: ReactNode;
}

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    try {
      const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];
      dispatch({ type: 'Cart-LoadCart from cookies | storage', payload: cookieProducts });
    } catch (error) {
      dispatch({ type: 'Cart-LoadCart from cookies | storage', payload: [] });
    }
  }, []);

  useEffect(() => {
    Cookie.set('cart', JSON.stringify(state.cart));
  }, [state.cart]);

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

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: 'Cart-Change product quantity', payload: product });
  };

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: 'Cart-Remove product', payload: product });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        updateCartQuantity,
        removeCartProduct
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
