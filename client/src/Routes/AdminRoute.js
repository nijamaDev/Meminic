import { Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { useState } from 'react';

export function AdminRoute({ children }) {
  const { verifyUserForUI } = UserContext();
  const [state, setState] = useState(null);
  verifyUserForUI().then((res) => {
    setState(res);
  });
  if (state) {
    return children;
  }
  return <Navigate to="/" />;
  // return <Navigate to="/admin" />;
}
