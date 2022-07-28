import { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./login.css";
//https://firebase.google.com/docs/auth/web/password-auth

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
        // toast('ログインしました')
      })
      .catch((error) => {
        setError(error);

        // toast('ログインに失敗しました')
      });
  };
  return (
    <div className="login">
      <h3 className="loginLogo">LogIn</h3>
      <br />

      <br />
      <div className="loginInfo">
        <p>mail:here@test.com password:123456</p>
      </div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placehoder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placehoder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
