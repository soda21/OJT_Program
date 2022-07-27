import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar";

import Message from "./pages/Message";
import List from "./pages/Users/List";
import AddEdit from "./pages/Users/AddEdit";
import About from "./pages/Users/About";
import View from "./pages/Users/View";
import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);
  // currenUserがfalseの場合、top画面にいけないようにRequireAuthでバインドをかける
  // const currentUser = true;
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  // console.log(currentUser);

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
            path="users"
            index
            element={
              <RequireAuth>
                <List />
              </RequireAuth>
            }
          />
          <Route
            path="update/:id"
            element={
              <RequireAuth>
                <AddEdit />
              </RequireAuth>
            }
          />
          <Route
            path="view/:id"
            element={
              <RequireAuth>
                <View />
              </RequireAuth>
            }
          />
          <Route
            path="about"
            element={
              <RequireAuth>
                <About />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
