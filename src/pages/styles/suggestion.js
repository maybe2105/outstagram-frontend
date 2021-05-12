import styled from 'styled-components/macro';

export const SuggestionContainer = styled.div`
  width: 100%;
  display: flex;
  height: auto;
  flex-direction: column;
`;
export const SuggestedAvatar = styled.div`
  float: left;
  width: auto;
  align-items: center;
  margin-top: 5px;
  text-align: center;
`;
export const SuggestedProfile = styled.div`
  padding: 8px 16px;
  display: flex;
  height: 32px;
  width: 100%;
  align-items: center;
`;
export const SuggestedUserName = styled.p`
  font-weight: 400;
  font-size: 12;
  padding-left: 10px;
  width: 100%;
`;
export const SuggestedText = styled.p`
  font-weight: 400;
  font-size: 12;
  padding-left: 12px;
  color: #666666;
  padding-top: 12px;
  padding-bottom: 12px;
  line-height: 16px;
  margin-block-start: 0;
  margin-block-end: 0;
  margin: 0;
`;
export const SuggestedFollowButton = styled.button`
  background: none;
  float: right;
  font-size: 12px;
  margin: -2px 0 -3px;
  line-height: 14px;
  padding: 0.25em 1em;
  border: none;
  font-weight: 600;
  color: #0095f6;
  cursor: pointer;
`;
export const Suggestedforyou = styled.p`
  font-weight: 300;
  font-size: 12px;
  color: #8e8e8e;
  padding-left: 10px;
  margin: 0px;
  overflow: hidden;
`;
export const SuggestWrap = styled.div`
  display: flex;
  margin: 0px;
  width: 100%;
  flex-direction: column;
`;
