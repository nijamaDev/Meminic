import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { MenuItemsSystem } from '../components/Menu/MenuItemsSystem';
import UserSectionModal from '../components/UserSectionModal/UserSectionModal';

export function UsersPage() {
  return (
    <>
      <Header menuItems={MenuItemsSystem} />
      <UserSectionModal />
      <Footer menuItems={MenuItemsSystem} />
    </>
  );
}
