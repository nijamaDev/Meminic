import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { MenuItemsSystem } from '../components/Menu/MenuItemsSystem';
import ProductReadTable from '../components/ProductReadTable/ProductReadTable';
import ProductReadTableEvents from '../components/ProductReadTable/ProductReadTableEvents';

export function ProductReadPage() {
  const { onClickProductsTable, productsList, isClicked } =
    ProductReadTableEvents();
  return (
    <>
      <Header menuItems={MenuItemsSystem} />
      <ProductReadTable
        onClickTable={onClickProductsTable}
        isClicked={isClicked}
        Items={productsList}
      />
      <Footer menuItems={MenuItemsSystem} />
    </>
  );
}
