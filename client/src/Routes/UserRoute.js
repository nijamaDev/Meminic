import { Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { useState } from 'react';

export function UserRoute({ children }) {
  const { verifyUserForUI } = UserContext();
  const [state, setState] = useState(null);
  verifyUserForUI().then((res) => {
    setState(!res);
  });
  console.log('zzzzzzz', state);
  if (state) {
    console.log('aaaaaaaaaaaaaa', state);
    return children;
  }
  return null;
}
