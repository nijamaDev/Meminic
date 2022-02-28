import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { MenuItemsSystem } from '../components/Menu/MenuItemsSystem';
import UserProfile from '../components/UserProfile/UserProfile';
import ModulesSectionSeller from '../components/ModulesSection/ModuleSectionSeller';
import { ModulesInfoSeller } from '../components/ModulesSection/ModulesInfoSeller';
import Auth0Hook from '../hooks/Auth0Hook';

export function SellerPage() {
  const { user } = Auth0Hook();
  return (
    <>
      <Header menuItems={MenuItemsSystem} />
      <UserProfile profileImg={user.picture} name={user.name} role="Vendedor" />
      <ModulesSectionSeller
        Modules={ModulesInfoSeller}
        className="modules__box__seller"
      />
      <Footer menuItems={MenuItemsSystem} />
    </>
  );
}
