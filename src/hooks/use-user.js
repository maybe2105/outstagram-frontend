import { useState, useContext, useEffect } from 'react';
import LoggedInUserContext from '../context/logged-in-user';
import { getUserByUserId } from '../services/firebase';
import * as api from '../api/index';
const useUser = (user) => {
  const [activeUser, setActiveUser] = useState({});
  const [loggedInUser, setloggedInUser] = useState(
    JSON.parse(localStorage.getItem('loggedInUser'))
  );
  //user
  useEffect(() => {
    if (loggedInUser) {
      setActiveUser(loggedInUser);
    } else {
      setActiveUser(user);
    }
  }, [user]);

  return { user: activeUser };
};
export default useUser;
