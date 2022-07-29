import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar";

import Message from "./pages/Message";
import AddUser from "./pages/Users/AddUser";
import UserDetail from "./pages/Users/UserDetail";
import View from "./pages/Users/UserDetail";
import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import {  userInputs } from "./formSource";
function App() {
  const { currentUser } = useContext(AuthContext);
  // currenUserがfalseの場合、top画面にいけないようにRequireAuthでバインドをかける
  // const currentUser = true;
  const RequireAuth = ({ children }) => {
    
    return currentUser ? children : <Navigate to="/login" />;
  };
  console.log(currentUser==null);
 

  return (
    <>
      <Navbar />
      <Message />
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
                <AddUser inputs={userInputs}/>
              </RequireAuth>
            }
          />
          <Route
            path="user/:id"
            element={
              <RequireAuth>
                <View inputs={userInputs}/>
              </RequireAuth>
            }
          />
      
        </Route>
      </Routes>
    </>
  );
}

export default App;
