import { FC, ReactNode, useEffect, useReducer, useContext } from 'react';
import Cookie from 'js-cookie';
import { CartContext, cartReducer } from './';
import { ICartProduct, IOrder, IShippingAddress } from '@/interfaces';
import { tesloApi } from '@/api';

export interface CartState {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;

  shippingAddress?: IShippingAddress;
}

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
  shippingAddress: undefined,
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
    if (Cookie.get('firstName')) {
      const address: any = {
        firstName: '',
        lastName: '',
        address: '',
        address2: '',
        zip: '',
        city: '',
        country: '',
        phone: '',
      };

      for (const [key, value] of Object.entries(address)) {
        address[key] = Cookie.get(key) || '';
      }
      dispatch({ type: 'Cart-Load address from cookies', payload: address });
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

  const updateAddress = (address: IShippingAddress) => {
    for (const [key, value] of Object.entries(address)) {
      Cookie.set(key, value);
    }
    dispatch({ type: 'Cart-Update address', payload: address });
  };

  const createOrder = async () => {
    if (!state.shippingAddress) {
      throw new Error('There is no delivery address');
    }

    const body: IOrder = {
      orderItems: state.cart.map((p) => ({
        ...p,
        size: p.size!,
      })),
      shippingAddress: state.shippingAddress,
      numberOfItems: state.numberOfItems,
      subTotal: state.subTotal,
      tax: state.tax,
      total: state.total,
      isPaid: false,
    };

    try {
      const { data } = await tesloApi.post('/orders', body);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        updateCartQuantity,
        removeCartProduct,
        updateAddress,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
