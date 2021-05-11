import { useState, useContext, useEffect } from 'react';
export default function useAuthListener() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('loggedInUser'))
  );
  return { user };
}
