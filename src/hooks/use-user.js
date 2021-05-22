import { useState, useEffect } from 'react';
const useUser = (user) => {
  const [loggedInUser, setloggedInUser] = useState(
    JSON.parse(localStorage.getItem('loggedInUser'))
  );
  const [activeUser, setActiveUser] = useState(loggedInUser);
  //user
  useEffect(() => {
    user ? setloggedInUser(user) : setloggedInUser(loggedInUser);
    if (user?._id) {
      console.log(user);
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
