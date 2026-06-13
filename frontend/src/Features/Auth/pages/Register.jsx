import { Link, useNavigate, useNavigation } from "react-router";
import FormGroup from "../components/FormGroup";
import "../styles/register.scss";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, handleRegister } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister(email, username, password);
    navigate("/");
  };
  return (
    <main className="register-page">
      <div className="form-container">
        <h1 className="h1">Register</h1>
        <form className="form" onSubmit={handleSubmit}>
          <FormGroup
            label={"Username"}
            type={"text"}
            placeholder={"enter username"}
            name={"username"}
            required={true}
            value={username}
            setValue={setUsername}
          />
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
          <button className="button btn-primary">Register</button>
        </form>
        <p className="redirect-text">
          Already have an account ?{" "}
          <Link className="link" to="/login">
            login
          </Link>{" "}
          here
        </p>
      </div>
    </main>
  );
};

export default Register;
