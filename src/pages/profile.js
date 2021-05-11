import React from 'react'
import useUser from '../hooks/use-user'
import Navbar from '../pages/navbar'
import LoggedInUserContext from '../context/logged-in-user';
const Profile = ({ user: loggedInUser, setUser }) => {
    const { user } = useUser(loggedInUser);

    return (
      <LoggedInUserContext.Provider value={{ user }}>
        <Navbar />
        This is profile
      </LoggedInUserContext.Provider>
    );
  };
  
  export default Profile;
  
