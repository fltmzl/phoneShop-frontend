import { AuthContext } from "context/AuthContext";
import { useContext, useEffect } from "react";

const useAuth = () => {
  const { isLoggedIn, userId, username, login, logout, error, token, setUserAsLoggedIn } = useContext(AuthContext);

  return { isLoggedIn, userId, username, login, logout, error, token, setUserAsLoggedIn };
};

export default useAuth;
