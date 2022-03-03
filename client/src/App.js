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
import MovementBase from "./components/MovementBase/MovementBase";
import "./index.css";
import "./components/ModulesBox/ModulesBox.css";
import UserContext from "./context/UserContext";
import Auth0Hook from "./hooks/Auth0Hook";
import { MenuItemsLogin } from "./components/Menu/MenuItemsLogin";
import { MenuItemsSystem } from "./components/Menu/MenuItemsSystem";
import { BrowserRouter as Router, Routes, Route , useNavigate , Navigate,useLocation} from "react-router-dom";
import { ModulesInfoAdmin } from "./components/ModulesSection/ModulesInfoAdmin";
import { ModulesInfoSeller } from "./components/ModulesSection/ModulesInfoSeller";
import MovementAddSaleEvents from "./components/MovementBase/MovementAddSaleEvents";
import { useState , useEffect} from "react";
import HomeLogin from "./components/HomeLogin/HomeLogin";
import { useAuth0 } from "@auth0/auth0-react";
import AuthCall from "./components/AuthCall/AuthCall";

function App() {
  const { user, isAuthenticated } = Auth0Hook();
  const { loginWithRedirect } = useAuth0();
  const { verifyUser, readResult, isAdmin } = UserContext();
  const { onClickRegisterSale } = MovementAddSaleEvents();
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
            element = {
              isAuthenticated?
                    <Navigate to="/home"  />  :
                    <Navigate to="/login"  />
            }
          />
          <Route
            path="/test"
            element={
              <> <AuthCall/> </>
              
          }
           
          />
          <Route
            path="/home"
            element={
              <HomeLogin />
            }
          />
          <Route
            path="/login"
            element={
              <>
                  {" "}
                  <Header menuItems={MenuItemsLogin} />
                  <Banner />
                  <ServicesBanner />
                  <Footer menuItems={MenuItemsLogin} />
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
                    <Header menuItems={MenuItemsSystem} />{" "}
                    <MovementBase
                      title="Venta"
                      onClickEvent={onClickRegisterSale}
                      message="La venta ha sido registrada con éxito!"
                      modalTitle="Venta registrada"
                    />
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
