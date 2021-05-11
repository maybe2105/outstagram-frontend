import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getSuggestedProfiles } from '../services/firebase';
import { SuggestionContainer, SuggestedText } from './styles/suggestion';
import ProfileComponent from './suggestedProfile';
const Suggestion = ({userId, following, loggedInUserDocId }) => {
  const [profiles, setProfile] = useState(null);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const suggestedProfiles = async () => {
      const response = await getSuggestedProfiles(token, following);
      setProfile(response.data.profile);
    };
    if (userId) {
      suggestedProfiles();
    }
  }, [userId]);

  return !profiles ? (
    <p>Loading....</p>
  ) : profiles.length > 0 ? (
    <SuggestionContainer>
      <SuggestedText>Suggested for you</SuggestedText>
      {profiles.map((profile) => {
        return (
          <ProfileComponent
            key={profile.docId}
            profileDocId={profile.docId}
            username={profile.username}
            profileId={profile.userId}
            userId={userId}
            loggedInUserDocId={loggedInUserDocId}
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
