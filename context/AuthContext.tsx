import { api } from "config/axios";
import { useRouter } from "next/router";
import React, { createContext, useReducer, ReactNode, useCallback } from "react";
import useCookies from "react-cookie/cjs/useCookies";

interface AuthState {
  isLoggedIn: boolean | any;
  userId: string | any;
  username: string | any;
  token: any;
  error: any;
}

interface AuthAction {
  type: "LOGIN" | "LOGOUT";
  payload?: {
    isLoggedIn: boolean;
    userId?: string | null;
    username?: string | null;
    token?: string | null;
    error?: any;
  };
}

export const initialValues = {
  isLoggedIn: false,
  userId: "",
  username: "",
  token: null,
  error: null,
  login: (email: string, password: string) => {},
  logout: () => {},
  setUserAsLoggedIn: ({ userId, username, token }: { userId: string; username: string; token: string }) => {},
};

export const AuthContext = createContext(initialValues);

function reducer(state: AuthState, action: AuthAction) {
  switch (action.type) {
    case "LOGIN":
      const { payload } = action;

      return {
        isLoggedIn: payload?.isLoggedIn,
        userId: payload?.userId,
        username: payload?.username,
        token: payload?.token,
        error: payload?.error,
      };
    case "LOGOUT":
      return {
        isLoggedIn: false,
        userId: null,
        username: null,
        token: null,
        error: null,
      };
    default:
      return state;
  }
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValues);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const router = useRouter();

  const setUserAsLoggedIn = useCallback(({ userId, username, token }: { userId: string; username: string; token: string }) => {
    dispatch({
      type: "LOGIN",
      payload: {
        isLoggedIn: true,
        userId,
        username,
        token,
        error: null,
      },
    });
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const { data } = res;

      dispatch({
        type: "LOGIN",
        payload: {
          isLoggedIn: true,
          userId: data.user.id,
          username: data.user.username,
          token: data.accessToken,
          error: null,
        },
      });

      setCookie("token", data.accessToken, { path: "/" });
      router.push("/");
    } catch (err: any) {
      dispatch({
        type: "LOGIN",
        payload: {
          isLoggedIn: false,
          userId: null,
          username: null,
          token: null,
          error: err.response.data,
        },
      });
    }
  };

  const logout = () => {
    removeCookie("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: state.isLoggedIn,
        userId: state.userId,
        username: state.username,
        token: state.token,
        error: state.error,
        login,
        logout,
        setUserAsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
