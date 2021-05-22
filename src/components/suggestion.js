import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { SuggestionContainer, SuggestedText } from './styles/suggestion';
import ProfileComponent from './suggestedProfile';
import { useHistory } from 'react-router-dom';
import * as api from '../api/index';
import UserContext from '../context/user';
const Suggestion = ({ userId, following, loggedInUserDocId }) => {
  const [profiles, setProfile] = useState(null);
  const token = localStorage.getItem('token');
  const history = useHistory();
  const [trigger, setTrigger] = useState(following);
  const { updateUser } = useContext(UserContext);
  useEffect(() => {
    const suggestedProfiles = async () => {
      try {
        const response = await api.SuggestProfile(following, token);
        setProfile(response.data);
      } catch (err) {
        localStorage.removeItem('loggedInUser');
        updateUser(null);
        history.push('/login');
      }
    };
    if (userId) {
      suggestedProfiles();
    }
  }, [following, trigger, token, userId]);

  return !profiles ? (
    <p>Loading....</p>
  ) : profiles.length > 0 ? (
    <SuggestionContainer>
      <SuggestedText>Suggested for you</SuggestedText>
      {profiles.map((profile) => {
        return (
          <ProfileComponent
            avatar={profile.avatar}
            key={profile._id}
            profileDocId={profile._id}
            username={profile.username}
            profileId={profile._id}
            userId={userId}
            loggedInUserDocId={loggedInUserDocId}
            trigger={trigger}
            setTrigger={setTrigger}
          />
        );
      })}
    </SuggestionContainer>
  ) : null;
};
Suggestion.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  loggedInUserDocId: PropTypes.string,
};
export default Suggestion;
