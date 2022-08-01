import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import React from "react";
const INITIAL_STATE = {
  // ローカルストレージからjsonを読み込むのでオブジェクト化
  // 左辺がfalseだったら右辺を返す
  currentUser: JSON.parse(localStorage.getItem("user") || null),
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // ローカルストレージにログイン情報を保持する
  useEffect(() => {
    // 文字列である必要があるのでjsonstringfyをする
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
