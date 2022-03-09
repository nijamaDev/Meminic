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
import { MenuItemsSeller } from "./components/Menu/MenuItemsSeller";
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
                            {isAdmin ? (
                              <>
                                <Header menuItems={MenuItemsSystem} />
                                <UserProfile
                                  profileImg={user.picture}
                                  name={user.name}
                                  role="Administrador"
                                />
                                <ModulesSectionAdmin
                                  Modules={ModulesInfoAdmin}
                                />
                                <Footer menuItems={MenuItemsSystem} />
                              </>
                            ) : (
                              <>
                                <Header menuItems={MenuItemsSeller} />
                                <UserProfile
                                  profileImg={user.picture}
                                  name={user.name}
                                  role="Vendedor"
                                />
                                <ModulesSectionSeller
                                  Modules={ModulesInfoSeller}
                                  className="modules__box__seller"
                                />
                                <Footer menuItems={MenuItemsSeller} />
                              </>
                            )}
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
                {isAdmin ? (
                  <Header menuItems={MenuItemsSystem} />
                ) : (
                  <Header menuItems={MenuItemsSeller} />
                )}
                <ProductsAddSection user={user} />
                {isAdmin ? (
                  <Footer menuItems={MenuItemsSystem} />
                ) : (
                  <Footer menuItems={MenuItemsSeller} />
                )}
              </>
            }
          />
          <Route
            path="/products/update"
            element={
              <>
                {isAdmin ? (
                  <Header menuItems={MenuItemsSystem} />
                ) : (
                  <Header menuItems={MenuItemsSeller} />
                )}
                <ProductsUpdateSection user={user} />
                {isAdmin ? (
                  <Footer menuItems={MenuItemsSystem} />
                ) : (
                  <Footer menuItems={MenuItemsSeller} />
                )}
              </>
            }
          />
          <Route
            path="/products/read"
            element={
              <>
                {isAdmin ? (
                  <Header menuItems={MenuItemsSystem} />
                ) : (
                  <Header menuItems={MenuItemsSeller} />
                )}
                <ProductReadTable
                  onClickTable={onClickProductsTable}
                  isClicked={isClicked}
                  Items={productsList}
                />
                {isAdmin ? (
                  <Footer menuItems={MenuItemsSystem} />
                ) : (
                  <Footer menuItems={MenuItemsSeller} />
                )}
              </>
            }
          />
          <Route
            path="/movements/sales"
            element={
              <>
                {isAuthenticated ? (
                  <>
                    {isAdmin ? (
                      <Header menuItems={MenuItemsSystem} />
                    ) : (
                      <Header menuItems={MenuItemsSeller} />
                    )}{" "}
                    <MovementBaseSale
                      title="Venta"
                      messageRegister="La venta ha sido registrada con éxito!"
                      messageAmount="La cantidad de existencias no es suficiente"
                      modalTitle="Venta registrada"
                    />
                    {isAdmin ? (
                      <Footer menuItems={MenuItemsSystem} />
                    ) : (
                      <Footer menuItems={MenuItemsSeller} />
                    )}{" "}
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
                <Header menuItems={MenuItemsLogin} />
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
                    {isAdmin ? (
                      <Header menuItems={MenuItemsSystem} />
                    ) : (
                      <Header menuItems={MenuItemsSeller} />
                    )}{" "}
                    <MovementBasePurchase
                      title="Compra"
                      onClickEvent={onClickRegisterPurchase}
                      message="La compra ha sido registrada con éxito!"
                      modalTitle="Compra registrada"
                    />
                    {isAdmin ? (
                      <Footer menuItems={MenuItemsSystem} />
                    ) : (
                      <Footer menuItems={MenuItemsSeller} />
                    )}{" "}
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
                    {isAdmin ? (
                      <Header menuItems={MenuItemsSystem} />
                    ) : (
                      <Header menuItems={MenuItemsSeller} />
                    )}{" "}
                    <MovementBaseReturnSale
                      title="Devolución en venta"
                      message="La devolución ha sido registrada con éxito!"
                      modalTitle="Devolución registrada"
                      messageError="No fue posible realizar la devolución, revise el número de factura "
                      modalTitleError="Devolución no registrada"
                    />
                    {isAdmin ? (
                      <Footer menuItems={MenuItemsSystem} />
                    ) : (
                      <Footer menuItems={MenuItemsSeller} />
                    )}{" "}
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
                    {isAdmin ? (
                      <Header menuItems={MenuItemsSystem} />
                    ) : (
                      <Header menuItems={MenuItemsSeller} />
                    )}{" "}
                    <MovementBaseReturnPurchase
                      title="Devolución de compra"
                      messageRegister="La devolución de compra ha sido registrada con éxito!"
                      modalTitle="Devolución de compra registrada"
                    />
                    {isAdmin ? (
                      <Footer menuItems={MenuItemsSystem} />
                    ) : (
                      <Footer menuItems={MenuItemsSeller} />
                    )}{" "}
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
                    {isAdmin ? (
                      <Header menuItems={MenuItemsSystem} />
                    ) : (
                      <Header menuItems={MenuItemsSeller} />
                    )}{" "}
                    <MovementBaseVisualize title="Consulta de movimientos" />
                    {isAdmin ? (
                      <Footer menuItems={MenuItemsSystem} />
                    ) : (
                      <Footer menuItems={MenuItemsSeller} />
                    )}{" "}
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
