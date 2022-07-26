import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar";
import React from "react";
import Message from "./pages/Message";
import AddUser from "./pages/Users/AddUser";
import UserDetail from "./pages/Users/UserDetail";
import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { userInputs } from "./formSource";
import Product from "./pages/Products/Product";
import ProductList from "./pages/Products/ProductList";
import ProductDetail from "./pages/Products/ProductDetail";
import { Chart } from "./Chart/Chart";

function App() {
  const { currentUser } = useContext(AuthContext);
  // currenUserがfalseの場合、top画面にいけないようにRequireAuthでバインドをかける
  // const currentUser = true;
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  console.log(currentUser == null);

  return (
    <>
      <Navbar />
      {/* <Message /> */}
      <Routes>
        <Route path="/">
          <Route path="login" element={<Login />} />
          <Route
            index
            element={
              // currenUserがfalseの場合、top画面にいけないようにRequireAuthでラップする
              <RequireAuth>
                <Home userLoginInfo={true} />
              </RequireAuth>
            }
          />
          <Route
            path="adduser"
            element={
              <RequireAuth>
                <AddUser inputs={userInputs} />
              </RequireAuth>
            }
          />
          <Route
            path="user/:id"
            element={
              <RequireAuth>
                <UserDetail inputs={userInputs} />
              </RequireAuth>
            }
          />
          <Route
            path="product"
            element={
              <RequireAuth>
                <Product />
              </RequireAuth>
            }
          />
          <Route
            path="productlist"
            element={
              <RequireAuth>
                <ProductList />
              </RequireAuth>
            }
          />{" "}
          <Route
            path="product/:id"
            element={
              <RequireAuth>
                <ProductDetail />
              </RequireAuth>
            }
          />
          <Route
            path="chart"
            element={
              <RequireAuth>
                <Chart />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
