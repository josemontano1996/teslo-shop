import { FC, ReactNode, useReducer } from 'react';
import Cookies from 'js-cookie';
import { AuthContext, authReducer } from './';
import { IUser } from '@/interfaces';
import { tesloApi } from '@/api';

export interface AuthState {
  isLoggedIn: boolean;
  user: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined!,
};

interface Props {
  children: ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post('/user/login', { email, password });
      const { token, user } = data;

      Cookies.set('token', token);
      dispatch({ type: 'Auth-Log in', payload: user });
      return true;
    } catch (error) {
      return false;
    }
  };

  const onRegister = (user: IUser) => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,

        //Methods
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
