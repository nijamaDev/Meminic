import React from "react";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import ServicesBanner from "./components/ServicesBanner/ServicesBanner";
import Footer from "./components/Footer/Footer";
import ModulesSectionAdmin from "./components/ModulesSection/ModulesSectionAdmin";
import ModulesSectionSeller from "./components/ModulesSection/ModuleSectionSeller";
import ProductsAddSection from "./components/ProductAddSection/ProductsAddSection";
import ProductsUpdateSection from "./components/ProductUpdateSection/ProductsUpdateSection";
import UserProfile from "./components/UserProfile/UserProfile";
import ProductReadTableEvents from "./components/ProductReadTable/ProductReadTableEvents";
import ProductReadTable from "./components/ProductReadTable/ProductReadTable";
import UserSectionModal from "./components/UserSectionModal/UserSectionModal";
import MovementSales from "./components/MovementSales/MovementSales";
import "./index.css";
import "./components/ModulesBox/ModulesBox.css";
import UserContext from "./context/UserContext";
import Auth0Hook from "./hooks/Auth0Hook";
import { MenuItemsLogin } from "./components/Menu/MenuItemsLogin";
import { MenuItemsSystem } from "./components/Menu/MenuItemsSystem";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ModulesInfoAdmin } from "./components/ModulesSection/ModulesInfoAdmin";
import { ModulesInfoSeller } from "./components/ModulesSection/ModulesInfoSeller";
import { useState } from "react";

function App() {
  const { user, isAuthenticated } = Auth0Hook();
  const { verifyUser, readResult, isAdmin } = UserContext();
  const [readResultUsed, setReadResultUsed] = useState(false);
  const [auth0Authenticated, setAuth0Authenticated] = useState(false);
  const { onClickProductsTable, productsList, isClicked } =
    ProductReadTableEvents();
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {isAuthenticated && !auth0Authenticated ? (
                  verifyUser() && setAuth0Authenticated(true) && <></>
                ) : (
                  <>
                    {isAuthenticated &&
                    auth0Authenticated &&
                    !readResultUsed ? (
                      readResult() && setReadResultUsed(true) && <></>
                    ) : (
                      <>
                        {isAuthenticated &&
                        auth0Authenticated &&
                        readResultUsed ? (
                          <>
                            <Header menuItems={MenuItemsSystem} />
                            {isAdmin ? (
                              <>
                                <UserProfile
                                  profileImg={user.picture}
                                  name={user.name}
                                  role="Administrador"
                                />
                                <ModulesSectionAdmin
                                  Modules={ModulesInfoAdmin}
                                />
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
                            {" "}
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
              </>
            }
          />
          <Route
            path="/users"
            element={
              <>
                <Header menuItems={MenuItemsSystem} />
                <UserSectionModal />
                <Footer menuItems={MenuItemsSystem} />
              </>
            }
          />
          <Route
            path="/products/create"
            element={
              <>
                <Header menuItems={MenuItemsSystem} />
                <ProductsAddSection user={user} />
                <Footer menuItems={MenuItemsSystem} />
              </>
            }
          />
          <Route
            path="/products/update"
            element={
              <>
                <Header menuItems={MenuItemsSystem} />
                <ProductsUpdateSection user={user} />
                <Footer menuItems={MenuItemsSystem} />
              </>
            }
          />
          <Route
            path="/products/read"
            element={
              <>
                <Header menuItems={MenuItemsSystem} />
                <ProductReadTable
                  onClickTable={onClickProductsTable}
                  isClicked={isClicked}
                  Items={productsList}
                />
                <Footer menuItems={MenuItemsSystem} />
              </>
            }
          />
          <Route
            path="/movements/sales"
            element={
              <>
                {isAuthenticated ? (
                  <>
                    <Header menuItems={MenuItemsSystem} /> <MovementSales />
                    <Footer menuItems={MenuItemsSystem} />{" "}
                  </>
                ) : (
                  <></>
                )}
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
