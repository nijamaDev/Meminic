import React from 'react';
import Banner from '../components/Banner/Banner';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { MenuItemsLogin } from '../components/Menu/MenuItemsLogin';
import ServicesBanner from '../components/ServicesBanner/ServicesBanner';
import { Navigate } from 'react-router-dom';
import Auth0Hook from '../hooks/Auth0Hook';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function HomePage() {
  const { isAuthenticated } = Auth0Hook();
  const { verifyUserForUI } = UserContext();
  const nav = useNavigate();
  const [state, setState] = useState('');
  verifyUserForUI().then((res) => setState(res));
  if (isAuthenticated) {
    console.log(state);
    if (state === true) return <Navigate to="/admin" />;
    else return <Navigate to="/seller" />;
  }
  return (
    <>
      <Header menuItems={MenuItemsLogin} />
      <Banner />
      <ServicesBanner />
      <Footer menuItems={MenuItemsLogin} />
    </>
  );
}
