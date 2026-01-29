import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

export const Profile = () => 
{
  const { user, logout, updateProfile } = useContext(AuthContext);
  const [name, setName] = useState(user.name);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSave = () => {
    updateProfile(name);
    setIsEditing(false);
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-container">

        <h2 className="profile-title"> Welcome {user.name}! </h2>
        <p className="profile-subtitle"> Your account details </p>

        <div className="profile-info">

          <p>
           <strong> Name : </strong> {user.name}
          </p>

          <p>
            <strong> Email : </strong> {user.email}
          </p>

          {isEditing ? (
            <>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button onClick={handleSave}> Update </button>

            </>
          ) : (
            <>

              <button onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>

            </>
          )}
        </div>

        <button onClick={handleLogout}> Logout </button>

      </div>
    </div>
  );
};

