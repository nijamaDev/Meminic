import React from 'react';
import ProductReadTableEvents from './components/ProductReadTable/ProductReadTableEvents';
import './index.css';
import './components/ModulesBox/ModulesBox.css';
import UserContext from './context/UserContext';
import Auth0Hook from './hooks/Auth0Hook';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { UsersPage } from './Pages/Users';
import { ProductCreatePage } from './Pages/ProductCreate';
import { HomePage } from './Pages/Home';
import { ProductUpdatePage } from './Pages/ProductUpdate';
import { ProductReadPage } from './Pages/ProductRead';
import { AdminPage } from './Pages/Admin';
import { SellerPage } from './Pages/Empleado';
import { AdminRoute } from './Routes/AdminRoute';

function App() {
  const { user, isAuthenticated } = Auth0Hook();
  const { verifyUser, readResult, isAdmin } = UserContext();
  const [readResultUsed, setReadResultUsed] = useState(false);
  const [auth0Authenticated, setAuth0Authenticated] = useState(false);
  const { onClickProductsTable, productsList, isClicked } =
    ProductReadTableEvents();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            /* 
            <>
              {isAuthenticated && !auth0Authenticated ? (
                verifyUser() && setAuth0Authenticated(true) && <></>
              ) : (
                <>
                  {isAuthenticated && auth0Authenticated && !readResultUsed ? (
                    readResult() && setReadResultUsed(true) && <></>
                  ) : (
                    <>
                      {isAuthenticated && auth0Authenticated && false ? ( // readResultUsed ? (
                        <>
                          <Header menuItems={MenuItemsSystem} />
                          {isAdmin ? (
                            <>
                              <UserProfile
                                profileImg={user.picture}
                                name={user.name}
                                role="Administrador"
                              />
                              <ModulesSectionAdmin Modules={ModulesInfoAdmin} />
                            </>
                          ) : (
                            <>
                              <UserProfile
                                profileImg={user.picture}
                                name={user.name}
                                role="Vendedor"
                              />
                              <ModulesSectionSeller
                                Modules={ModulesInfoSeller}
                                className="modules__box__seller"
                              />
                            </>
                          )}

                          <Footer menuItems={MenuItemsSystem} />
                        </>
                      ) : (
                        <>
                          {' '}
                          <Header menuItems={MenuItemsLogin} />
                          <Banner />
                          <ServicesBanner />
                          <Footer menuItems={MenuItemsLogin} />
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </> */
            <HomePage />
          }
        />

        <Route
          path="/admin"
          element={
            //<AdminRoute>
            <AdminPage />
            //</AdminRoute>
          }
        />
        <Route path="/seller" element={<SellerPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/products/create" element={<ProductCreatePage />} />
        <Route path="/products/update" element={<ProductUpdatePage />} />
        <Route path="/products/read" element={<ProductReadPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
