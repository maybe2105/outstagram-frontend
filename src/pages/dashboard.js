import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import useUser from '../hooks/use-user';
import Timeline from '../components/timeline';
import { DashboardContainer } from './styles/dashboard';
import LoggedInUserContext from '../context/logged-in-user';
import usePost from '../hooks/use-post';
import { Route } from 'react-router-dom';
import * as ROUTE from '../constants/route';
import Profile from './profile';
import { getPhotos } from '../services/services';
//prettier-ignore
const Dashboard = ({ currentUser: loggedInUser }) => {

  const [updated,setUpdate] = useState(false);
  const { user } = useUser(loggedInUser);

  const [photos,setPhotos] = useState();
  useEffect(() => {
    async function getTimelinePhotos() {
      // does the user actually follow people
      if (user?.followings?.length > 0) {
        try {
          const followedUserPhotos = await getPhotos(
            user.username,
            user.followings
          );

          // re-arrange array to be newest photos first by dateCreated
          if (followedUserPhotos?.length > 0) {
            followedUserPhotos.sort(
              (a, b) => b.createAt.toString() - a.createAt.toString()
            );
          }
          setPhotos(followedUserPhotos);
        } catch (err) {
          // if (err.response?.status === 401) {
          //   console.log('Unauthorized');
          //   localStorage.removeItem('loggedInUser');
          //   updateUser(null);
          //   history.push('/login');
          // }

          console.log(err);
        }
      } else {
        setPhotos([]);
      }
    }

    getTimelinePhotos();
  }, [user,loggedInUser, updated]);
  const handleUpdate =()=>{
    setUpdate(!updated);
  }
  return (
    <LoggedInUserContext.Provider value={{ user,loggedInUser,handleUpdate }}>
      <Navbar username={loggedInUser.username} updated={updated} />
      <Route exact path="/">
        <DashboardContainer>
          <Timeline posts={photos} handleUpdate={handleUpdate} />
          <Sidebar username={loggedInUser.username}/>
        </DashboardContainer>
      </Route>
      <Route exact path="/:id">
        <Profile currentName={user?.name}   handleUpdate={handleUpdate} />
      </Route>
    

    </LoggedInUserContext.Provider>
  );
};

export default Dashboard;
