import Home from "./pages/Home";
import Login from "./pages/Login";
import { Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);
  // currenUserがfalseの場合、top画面にいけないようにRequireAuthでバインドをかける
  // const currentUser = true;
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  console.log(currentUser);

  return (
    <BrowserRouter>
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
