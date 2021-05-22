import React from 'react';
import Navbar from '../components/navbar';
import Sidebar from './sidebar';
import useUser from '../hooks/use-user';
import Timeline from './timeline';
import { DashboardContainer } from './styles/dashboard';
import LoggedInUserContext from '../context/logged-in-user';
import usePost from '../hooks/use-post';
import { Route } from 'react-router-dom';
import Profile from './profile';
//prettier-ignore
const Dashboard = ({ currentUser: loggedInUser }) => {
  const { user } = useUser(loggedInUser);
  const { photos } = usePost(user);

  return (
    <LoggedInUserContext.Provider value={{ user }}>
      <Navbar user={user} />
      <Route exact path="/">
        <DashboardContainer>
          <Timeline posts={photos} />
          <Sidebar />
        </DashboardContainer>
      </Route>
      <Route exact path='/:id'>
        <Profile currentName={user?.name} />
      </Route>
    

    </LoggedInUserContext.Provider>
  );
};

export default Dashboard;
