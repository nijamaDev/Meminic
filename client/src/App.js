import React from "react";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import ServicesBanner from "./components/ServicesBanner/ServicesBanner";
import Footer from "./components/Footer/Footer";
import ModulesSection from "./components/ModulesSection/ModulesSection";
import UsersManagementSection from "./components/UsersManagementSection/UsersManagementSection";
import UserProfile from "./components/UserProfile/UserProfile";
import "./index.css";
import UserContext from "./context/UserContext";
import Auth0Hook from "./hooks/Auth0Hook";
import { MenuItemsLogin } from "./components/Menu/MenuItemsLogin";
import { MenuItemsSystem } from "./components/Menu/MenuItemsSystem";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const { user, isAuthenticated } = Auth0Hook();
  const { verifyUser } = UserContext();

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {" "}
                {isAuthenticated ? (
                  verifyUser() && (
                    <>
                      <Header menuItems={MenuItemsSystem} />
                      <UserProfile
                        profileImg={user.picture}
                        name={user.name}
                        role={"Administrador"}
                      />
                      <ModulesSection />
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
