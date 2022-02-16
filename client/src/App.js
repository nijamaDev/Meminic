import React from "react";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import ServicesBanner from "./components/ServicesBanner/ServicesBanner";
import Footer from "./components/Footer/Footer";
import UsersManagementSection from "./components/UsersManagementSection/UsersManagementSection";
import ModulesSectionAdmin from "./components/ModulesSection/ModulesSectionAdmin";
import ModulesSectionSeller from "./components/ModulesSection/ModuleSectionSeller";
import UserProfile from "./components/UserProfile/UserProfile";
import "./index.css";
import "./components/ModulesBox/ModulesBox.css";
import UserContext from "./context/UserContext";
import Auth0Hook from "./hooks/Auth0Hook";
import { MenuItemsLogin } from "./components/Menu/MenuItemsLogin";
import { MenuItemsSystem } from "./components/Menu/MenuItemsSystem";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ModulesInfoAdmin } from "./components/ModulesSection/ModulesInfoAdmin";
import { ModulesInfoSeller } from "./components/ModulesSection/ModulesInfoSeller";
function App() {
  const { user, isAuthenticated } = Auth0Hook();
  const { verifyUser, readResult, isAdmin } = UserContext();
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {isAuthenticated ? (
                  verifyUser() &&
                  readResult() && (
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
                  )
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
            }
          />
          <Route
            path="/users"
            element={
              <>
                <Header menuItems={MenuItemsSystem} />
                <UsersManagementSection />
                <Footer menuItems={MenuItemsSystem} />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
