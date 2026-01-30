import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export const Login = () => 
{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => 
  {
    e.preventDefault();
    setError("");

    const result = login(email, password);

    if (!result.success) 
    {
      setError(result.message);
      return;
    }

    navigate("/profile");
  };


  return (
    <div className="auth-wrapper">
     <div className="container">   

      <h2 className="auth-title"> User Login </h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />

        <button type="submit"> Login </button>
       </form>

       <br/>

        <p>
          Don't have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/register")}
          >
           Register
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;
