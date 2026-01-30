import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => 
{
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => 
  {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>

      <span
        style={{ fontWeight: "bold", cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        Account Manager
      </span>

      <span style={{ float: "right" }}>
        {!user ? (
          <>
            <button onClick={() => navigate("/login")}> Login </button>{" "}
            <button onClick={() => navigate("/register")}> Register </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/profile")}> Profile </button>{" "}
            <button onClick={handleLogout}> Logout </button>
          </>
        )}
      </span>
      
    </nav>
  );
};

