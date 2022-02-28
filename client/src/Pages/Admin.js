import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { MenuItemsSystem } from '../components/Menu/MenuItemsSystem';
import Auth0Hook from '../hooks/Auth0Hook';
import UserProfile from '../components/UserProfile/UserProfile';
import ModulesSectionAdmin from '../components/ModulesSection/ModulesSectionAdmin';
import { ModulesInfoAdmin } from '../components/ModulesSection/ModulesInfoAdmin';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export function AdminPage() {
  const { user, isAuthenticated } = Auth0Hook();
  return isAuthenticated ? (
    <>
      <Header menuItems={MenuItemsSystem} />
      <UserProfile
        profileImg={user.picture}
        name={user.name}
        role="Administrador"
      />
      <ModulesSectionAdmin Modules={ModulesInfoAdmin} />
      <Footer menuItems={MenuItemsSystem} />
    </>
  ) : (
    <></>
  );
}
