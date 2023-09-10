import { FC, ReactNode, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';
import { CartContext, cartReducer } from './';
import { ICartProduct } from '@/interfaces';

export interface CartState {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
}

const CART_INITIAL_STATE: CartState = {
  cart: Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
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

  useEffect(() => {
    const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0);
    const subTotal = state.cart.reduce(
      (prev, current) => current.price * current.quantity + prev,
      0
    );

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (1 + taxRate),
    };

    dispatch({ type: 'Cart-Update order summary', payload: orderSummary });
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
        removeCartProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
