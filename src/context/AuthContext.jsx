import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ( { children} ) => 
{
  const [user,setUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser") || null)
  );
  

  //  For User Registration

  const register = (name, email, password) => 
  {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find( (u) => u.email === email );
    if(exists)
    {
      return { success: false, message: "User already exists!" };  
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    return { success: true };
  };


  //  For User Login

  const login = (email, password) =>
  {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(
      (u) => u.email === email && u.password === password  
    );

    if(!validUser)
    {
      return { success: false, message: "Invalid Credentials!"};  
    }

    localStorage.setItem("loggedInUser", JSON.stringify(validUser));
    setUser(validUser);

    return { success: true };
  }


  // For Updating User Profile

  const updateProfile = (updatedName) => 
  {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((u) =>
      u.email === user.email ? { ...u, name: updatedName } : u
    );

    const updatedUser = { ...user, name: updatedName };

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };


  //  For User Logout

  const logout = () => 
  {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  } 

  return(
    <AuthContext.Provider 
      value={{ user, register, login, logout, updateProfile }}
    >
     {children}  
    </AuthContext.Provider>
  );

};