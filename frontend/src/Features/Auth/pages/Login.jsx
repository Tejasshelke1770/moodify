import "../styles/login.scss";
import FormGroup from "../components/FormGroup";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(email, password);
    navigate("/")
  };

  return (
    <main className="login-page">
      <div className="form-container">
        <h1 className="h1">Login</h1>
        <form className="form" onSubmit={handleSubmit}>
          <FormGroup
            label={"Email"}
            type={"email"}
            placeholder={"example@gmail.com"}
            name={"email"}
            required={true}
            value={email}
            setValue={setEmail}
          />
          <FormGroup
            label={"Password"}
            type={"password"}
            placeholder={"enter password"}
            name={"password"}
            required={true}
            value={password}
            setValue={setPassword}
          />
          <button className="button btn-primary">Login</button>
        </form>
        <p className="redirect-text">
          Don't have an account ?{" "}
          <Link className="link" to="/register">
            register
          </Link>{" "}
          here
        </p>
      </div>
    </main>
  );
};

export default Login;
