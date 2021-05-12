import { useState, useEffect } from 'react';
const useUser = (user) => {
  const [loggedInUser, setloggedInUser] = useState(
    JSON.parse(localStorage.getItem('loggedInUser'))
  );
  const [activeUser, setActiveUser] = useState(loggedInUser);
  //user
  useEffect(() => {
    if (user?._id) {
      setActiveUser(user);
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      return { user: activeUser };
    }
    if (loggedInUser) {
      setActiveUser(loggedInUser);
    }
    if (!loggedInUser) {
      setActiveUser(null);
    }
  }, [user, loggedInUser]);

  return { user: activeUser };
};
export default useUser;
