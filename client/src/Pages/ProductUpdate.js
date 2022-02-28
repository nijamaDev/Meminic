import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { MenuItemsSystem } from '../components/Menu/MenuItemsSystem';
import Auth0Hook from '../hooks/Auth0Hook';
import ProductsUpdateSection from '../components/ProductUpdateSection/ProductsUpdateSection';

export function ProductUpdatePage() {
  const { user } = Auth0Hook();
  return (
    <>
      <Header menuItems={MenuItemsSystem} />
      <ProductsUpdateSection user={user} />
      <Footer menuItems={MenuItemsSystem} />
    </>
  );
}
