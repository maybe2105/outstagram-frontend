import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SuggestionContainer, SuggestedText } from './styles/suggestion';
import ProfileComponent from './suggestedProfile';
import * as api from '../api/index';
const Suggestion = ({ userId, following, loggedInUserDocId }) => {
  const [profiles, setProfile] = useState(null);
  const token = localStorage.getItem('token');
  const [trigger, setTrigger] = useState(following);
  useEffect(() => {
    const suggestedProfiles = async () => {
      const response = await api.SuggestProfile(following, token);
      setProfile(response.data);
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
