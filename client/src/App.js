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
import MovementBaseSale from "./components/MovementBase/MovementBaseSale/MovementBaseSale";
import MovementBasePurchase from "./components/MovementBase/MovementBasePurchase/MovementBasePurchase";
import MovementBaseReturnSale from "./components/MovementBase/MovementBaseReturnSale/MovementBaseReturnSale";
import MovementAddPurchaseEvents from "./components/MovementBase/MovementBasePurchase/MovementAddPurchaseEvents";
import Graphics from "./components/Graphics/Graphics";
import "./index.css";
import UserContext from "./context/UserContext";
import Auth0Hook from "./hooks/Auth0Hook";
import { MenuItemsLogin } from "./components/Menu/MenuItemsLogin";
import { MenuItemsSystem } from "./components/Menu/MenuItemsSystem";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ModulesInfoAdmin } from "./components/ModulesSection/ModulesInfoAdmin";
import { ModulesInfoSeller } from "./components/ModulesSection/ModulesInfoSeller";
import MovementBaseReturnPurchase from "./components/MovementBase/MovementBaseReturnPurchase/MovementBaseReturnPurchase";
import MovementBaseVisualize from "./components/MovementBase/MovementBaseVisualize/MovementBaseVisualize";

import { useState } from "react";
import ContactPage from "./components/Contact/ContactPage";

function App() {
  const { user, isAuthenticated } = Auth0Hook();
  const { verifyUser, readResult, isAdmin } = UserContext();
  const { onClickRegisterPurchase } = MovementAddPurchaseEvents();
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
                          <div className="app__modules__container">
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
                          </div>
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
              <div className="app__users__container">
                <Header menuItems={MenuItemsSystem} />
                <UserSectionModal />
                <Footer menuItems={MenuItemsSystem} />
              </div>
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
                    <MovementBaseSale
                      title="Venta"
                      messageRegister="La venta ha sido registrada con éxito!"
                      messageAmount="La cantidad de existencias no es suficiente"
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
          <Route
            path="/contact"
            element={
              <>
                <Header menuItems={MenuItemsSystem} />
                <ContactPage />
                <Footer menuItems={MenuItemsLogin} />
              </>
            }
          />
          <Route
            path="/movements/purchases"
            element={
              <>
                {isAuthenticated ? (
                  <div className="app__footer__movements">
                    <Header menuItems={MenuItemsSystem} />{" "}
                    <MovementBasePurchase
                      title="Compra"
                      onClickEvent={onClickRegisterPurchase}
                      message="La compra ha sido registrada con éxito!"
                      modalTitle="Compra registrada"
                    />
                    <Footer menuItems={MenuItemsSystem} />{" "}
                  </div>
                ) : (
                  <></>
                )}
              </>
            }
          />
          <Route
            path="/movements/returnSale"
            element={
              <>
                {isAuthenticated ? (
                  <div className="app__footer__movements">
                    <Header menuItems={MenuItemsSystem} />{" "}
                    <MovementBaseReturnSale
                      title="Devolución en venta"
                      message="La devolución ha sido registrada con éxito!"
                      modalTitle="Devolución registrada"
                      messageError="No fue posible realizar la devolución, revise el número de factura "
                      modalTitleError="Devolución no registrada"
                    />
                    <Footer menuItems={MenuItemsSystem} />{" "}
                  </div>
                ) : (
                  <></>
                )}
              </>
            }
          />
          <Route
            path="/movements/returnPurchases"
            element={
              <>
                {isAuthenticated ? (
                  <div className="app__footer__movements">
                    <Header menuItems={MenuItemsSystem} />{" "}
                    <MovementBaseReturnPurchase
                      title="Devolución de compra"
                      messageRegister="La devolución de compra ha sido registrada con éxito!"
                      modalTitle="Devolución de compra registrada"
                    />
                    <Footer menuItems={MenuItemsSystem} />{" "}
                  </div>
                ) : (
                  <></>
                )}
              </>
            }
          />
          <Route
            path="/movements/visualize"
            element={
              <>
                {isAuthenticated ? (
                  <div className="app__footer__movements">
                    <Header menuItems={MenuItemsSystem} />{" "}
                    <MovementBaseVisualize title="Consulta de movimientos" />
                    <Footer menuItems={MenuItemsSystem} />{" "}
                  </div>
                ) : (
                  <></>
                )}
              </>
            }
          />
          <Route
            path="/reports"
            element={
              isAuthenticated ? (
                <div className="app__footer__reports">
                  <Header menuItems={MenuItemsSystem} /> <Graphics />
                  <Footer menuItems={MenuItemsSystem} />{" "}
                </div>
              ) : (
                <></>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
