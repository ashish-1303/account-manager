import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export const Register = () => 
{
  const [name, setName] = useState("");  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const nameRegex = /^[A-Za-z\s.'-]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e) => 
  {
    e.preventDefault();
    setError("");

   // Validation for name(not allowing numbers)
   
      if (!nameRegex.test(name) || name.length < 3) 
      {
        setError("Name cannot contain numbers!");
        return;
      }

   // Validation for email

    if (!emailRegex.test(email)) 
    {
      setError("Invalid email!");
      return;
    }

    //  Validation for password

    if (password.length < 6) 
    {
      setError("Password must be at least 6 characters long!");
      return;
    }

    const result = register(name, email, password);

    if (!result.success) 
    {
      setError(result.message);
      setName("");
      setEmail("");
      setPassword("");
      return;
    }

    navigate("/login");
  };


  return (
    <div className="auth-wrapper">
     <div className="container">   

      <h2 className="auth-title"> User Registration </h2>

      {error && <p style={{ color: "red" }}> {error} </p>}

      <form onSubmit={handleSubmit}>
        
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <button type="submit"> Register </button>
       </form>
        
       <br />

        <p>
          Already have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>

     </div> 
    </div>
  );
};

