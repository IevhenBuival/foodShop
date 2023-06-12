import { useState } from 'react';
import FoodsPanel from '../components/FoodPages/FoodsPanel';
import ShopsPanel from '../components/FoodPages/ShopsPanel';
import styles from './PagesStyles.module.css';

const getShopFromStorage = (): string => {
  const storedShop = localStorage.getItem('shop');

  if (storedShop !== null) return storedShop;
  return '';
};
interface IShopPageProps {
  onCheckProd: () => void;
}
const ShopPage = ({ onCheckProd }: IShopPageProps) => {
  const [shop, setShop] = useState<string>(getShopFromStorage());

  return (
    <>
      <div className={`${styles.Row} container-fluid h-100  bg-white`}>
        <div
          className={`${styles.ShopsPanel} border border-dark rounded  mh-100 flex-shrink-0`}
        >
          <ShopsPanel shop={shop} setShop={setShop} />
        </div>
        <div
          className={`${styles.FoodsPanel} border border-dark rounded  mh-100 flex-shrink-1`}
        >
          <FoodsPanel shop={shop} setShop={setShop} onCheckProd={onCheckProd} />
        </div>
      </div>
    </>
  );
};

export default ShopPage;
