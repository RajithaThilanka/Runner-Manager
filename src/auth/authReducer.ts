/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CLEAR_USER,
  ClearUserAction,
  LOGIN_SUCCESS,
  LoginSuccessAction,
  LOGOUT,
  LogoutAction,
  SET_USER,
  SetUserAction,
} from "./authActions";

type AuthState = {
  accessToken?: string;
  idToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  scope?: string;
  tokenType?: string;
  user?: any;
};

const initialState: AuthState = {};

type AuthActions =
  | LoginSuccessAction
  | LogoutAction
  | SetUserAction
  | ClearUserAction;

export default function authReducer(
  state = initialState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, ...action.payload };
    case LOGOUT:
      return initialState;
    case SET_USER:
      return { ...state, user: action.payload };
    case CLEAR_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}
