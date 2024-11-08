import * as AuthSession from "expo-auth-session";
import { ThunkAction } from "redux-thunk";
import { Action, Dispatch } from "redux";
import { jwtDecode, JwtPayload } from "jwt-decode";
import axios from "axios";
import { RootState } from "../store/root-reducer";
import * as SecureStore from "expo-secure-store";

const AUTH_CLIENT_ID = `5719e40c-99bd-43ae-bc26-162e61907c0f`;

// Define action types
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const SET_USER = "SET_USER";
export const CLEAR_USER = "CLEAR_USER";
export const SET_PROFILE_IMAGE = "SET_PROFILE_IMAGE";

// SecureStore keys
export const TOKEN_KEY = "xbrokerjwttoken";
export const REFRESH_TOKEN_KEY = "xbrokerrefreshtoken";
export const TOKEN_EXPIRE_IN = "xbrokerexptokenin";

export interface LoginSuccessAction extends Action<typeof LOGIN_SUCCESS> {
  payload: {
    accessToken: string;
    idToken: string;
    refreshToken: string;
    expiresIn: number;
    scope: string;
    tokenType: string;
  };
}

export interface LogoutAction extends Action<typeof LOGOUT> {}

// User action interfaces
export interface SetUserAction extends Action<typeof SET_USER> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}

export interface ClearUserAction extends Action<typeof CLEAR_USER> {}

export interface SetProfileImageAction
  extends Action<typeof SET_PROFILE_IMAGE> {
  payload: string;
}

// Discovery endpoint configuration
const discovery = {
  authorizationEndpoint:
    "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
  tokenEndpoint: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
};

// Redirect URI configuration
const redirectUri = AuthSession.makeRedirectUri({
  scheme: "xbroker",
  path: "auth",
});

// Auth request configuration
const config: AuthSession.AuthRequestConfig = {
  clientId: AUTH_CLIENT_ID,
  redirectUri: redirectUri,
  scopes: ["openid", "profile", "email", "offline_access", "User.Read"],
  responseType: AuthSession.ResponseType.Code,
  extraParams: {
    response_type: "code",
  },
};

interface CustomTokenResponse extends AuthSession.TokenResponse {
  access_token?: string;
  id_token?: string;
  refresh_token?: string;
  expires_in?: number;
  scope?: string;
  token_type?: string;
  error?: string;
  error_description?: string;
  tokenResponse?: string;
}

const fetchProfileImage = async (
  accessToken: string
): Promise<string | null> => {
  try {
    const response = await axios.get(
      "https://graph.microsoft.com/v1.0/me/photo/$value",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: "blob",
      }
    );

    const reader = new FileReader();
    reader.readAsDataURL(response.data);
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return "path/to/default/profile/image.png";
      }
    } else {
      alert("Error fetching profile image");
    }
    return null;
  }
};

// Action creators for user actions
export const setUser =
  (token: string): ThunkAction<void, RootState, unknown, SetUserAction> =>
  (dispatch) => {
    const user = jwtDecode<JwtPayload>(token);
    dispatch({
      type: SET_USER,
      payload: user,
    });
  };

export const clearUser =
  (): ThunkAction<void, RootState, unknown, ClearUserAction> => (dispatch) => {
    dispatch({
      type: CLEAR_USER,
    });
  };

export const setProfileImage =
  (
    token: string
  ): ThunkAction<void, RootState, unknown, SetProfileImageAction> =>
  async (dispatch) => {
    const profileImage = await fetchProfileImage(token);
    if (profileImage) {
      dispatch<SetProfileImageAction>({
        type: SET_PROFILE_IMAGE,
        payload: profileImage,
      });
    }
  };

// Action creators
export const login =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      // Create a request object
      const request = new AuthSession.AuthRequest(config);
      await request.makeAuthUrlAsync(discovery);

      // Prompt user to sign in
      const result = await request.promptAsync(discovery);
      if (result.type === "success" && result.params.code) {
        const tokenResponse: CustomTokenResponse =
          await AuthSession.exchangeCodeAsync(
            {
              clientId: AUTH_CLIENT_ID,
              code: result.params.code,
              redirectUri: redirectUri,
              extraParams: {
                code_verifier: request.codeVerifier as string,
              },
            },
            discovery
          );

        if (tokenResponse.error) {
          alert(`Token error: ${tokenResponse.error_description}`);
          return;
        }

        if (tokenResponse?.refreshToken) {
          await SecureStore.setItemAsync(
            REFRESH_TOKEN_KEY,
            tokenResponse?.refreshToken as string
          );
        }

        dispatch<LoginSuccessAction>({
          type: LOGIN_SUCCESS,
          payload: {
            accessToken: tokenResponse?.accessToken as string,
            idToken: tokenResponse?.idToken as string,
            refreshToken: tokenResponse?.refreshToken as string,
            expiresIn: tokenResponse?.expiresIn as number,
            scope: tokenResponse?.scope as string,
            tokenType: tokenResponse?.tokenType as string,
          },
        });

        //   dispatch(setUser(tokenResponse?.accessToken as string));
        //   dispatch(setProfileImage(tokenResponse?.accessToken as string));
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (err) {
      alert(
        `Login error: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    }
  };

export const logout =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      dispatch<LogoutAction>({ type: LOGOUT });
      dispatch(clearUser());
    } catch (error) {
      console.error("Logout error", error);
    }
  };

// Function to refresh the access token using refresh token
export const refreshAccessToken = async (
  dispatch: Dispatch<LoginSuccessAction>
) => {
  try {
    const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const tokenResponse = await AuthSession.refreshAsync(
      {
        clientId: AUTH_CLIENT_ID,
        refreshToken: refreshToken,
      },
      discovery
    );

    if (tokenResponse?.accessToken) {
      if (tokenResponse.refreshToken) {
        await SecureStore.setItemAsync(
          REFRESH_TOKEN_KEY,
          tokenResponse.refreshToken
        );
      }

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          accessToken: tokenResponse.accessToken,
          idToken: tokenResponse.idToken as string,
          refreshToken: tokenResponse.refreshToken as string,
          expiresIn: tokenResponse.expiresIn as number,
          scope: tokenResponse.scope as string,
          tokenType: tokenResponse.tokenType as string,
        },
      });

      return tokenResponse.accessToken;
    } else {
      throw new Error("Failed to refresh access token");
    }
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
};
