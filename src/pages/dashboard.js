import React from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import useUser from '../hooks/use-user';
import Timeline from './timeline';
import { DashboardContainer } from './styles/dashboard';
import LoggedInUserContext from '../context/logged-in-user';
import usePhoto from '../hooks/use-photo';
const Dashboard = ({ user: loggedInUser, setUser }) => {
  const { user } = useUser(loggedInUser);
  const { photos } = usePhoto(user);

  return (
    <LoggedInUserContext.Provider value={{ user }}>
      <Navbar />
      <DashboardContainer>
        <Timeline posts={photos} />
        <Sidebar />
      </DashboardContainer>
    </LoggedInUserContext.Provider>
  );
};

export default Dashboard;
