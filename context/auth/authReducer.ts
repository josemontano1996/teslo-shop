import { IUser } from '@/interfaces';
import { AuthState } from '.';

type AuthActionType = { type: 'Auth-Log in'; payload: IUser } | { type: 'Auth-Log out' };

export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {
  switch (action.type) {
    case 'Auth-Log in':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case 'Auth-Log out':
      return {
        ...state,
        isLoggedIn: false,
        user: undefined!,
      };
    default:
      return state;
  }
};
