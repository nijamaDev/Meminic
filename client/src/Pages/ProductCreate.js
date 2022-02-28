import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { MenuItemsSystem } from '../components/Menu/MenuItemsSystem';
import ProductsAddSection from '../components/ProductAddSection/ProductsAddSection';
import Auth0Hook from '../hooks/Auth0Hook';
export function ProductCreatePage() {
  const { user } = Auth0Hook();
  return (
    <>
      <Header menuItems={MenuItemsSystem} />
      <ProductsAddSection user={user} />
      <Footer menuItems={MenuItemsSystem} />
    </>
  );
}
