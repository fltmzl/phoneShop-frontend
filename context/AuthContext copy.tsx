import { api } from "config/axios";
import React, { createContext, useReducer, useState } from "react";
import { ReactNode } from "react";

interface AuthState {
  isLoggedIn: boolean;
  user: any | null;
  token: string | null;
  error: any | null;
}

interface AuthAction {
  type: "LOGIN" | "LOGOUT";
  payload?: {
    email: string;
    password: string;
  };
}

const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  user: null,
  token: null,
  error: null,
});

const reducer = async (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      try {
        const res = await api.post("/auth/login", {
          email: action.payload?.email,
          password: action.payload?.password,
        });

        console.log(res);
        const data = res.data;

        return {
          isLoggedIn: true,
          user: { data },
          token: null,
          error: null,
        };
      } catch (error) {
        console.error(error);
      }

      break;
    case "LOGOUT":
      return {
        isLoggedIn: true,
        user: null,
        token: null,
        error: null,
      };
      break;
    default:
      return state;
      break;
  }
};

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  token: null,
  error: null,
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <AuthContext.Provider value={}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
