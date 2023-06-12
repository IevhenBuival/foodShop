import { useEffect, useMemo, useState } from 'react';
import { Row, Spinner } from 'react-bootstrap';

import * as FoodApi from '../../hooks/foodShop.api';
import { IProduct } from '../../models/IProduct';
import FoodCard from './FoodCard';

interface IFoodPanelProps {
  shop: string;
  setShop: (shop: string) => void;
  onCheckProd: () => void;
}

const selectedProductsFromStorage = (): string[] => {
  const ordered = localStorage.getItem('ordered');
  if (ordered) {
    const orderedProducts: string[] = JSON.parse(ordered);
    return orderedProducts;
  }

  return [];
};

const ShopsPanel = ({ shop, setShop, onCheckProd }: IFoodPanelProps) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [showFoodLoadingErrors, setShowFoodLoadingErrors] = useState(false);
  const [foodLoading, setFoodLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState<string[]>(
    selectedProductsFromStorage(),
  );

  useEffect(() => {
    async function LoadProducers() {
      try {
        const resProducts = await FoodApi.getProducts();
        setShowFoodLoadingErrors(false);
        setFoodLoading(true);
        setProducts(resProducts);
      } catch (error) {
        console.error(error);
        setShowFoodLoadingErrors(true);
      } finally {
        setFoodLoading(false);
      }
    }
    LoadProducers();
  }, []);

  const onSelectProduct = (checkedProduct: string[], shopID: string) => {
    setSelectedProducts(checkedProduct);
    if (checkedProduct.length === 1) {
      setShop(shopID);
    }
    onCheckProd();
  };

  const FoodCards = useMemo(() => {
    return (
      <Row xs={1} md={2} xl={3} className="mx-2 my-3">
        {products
          .filter((p) => {
            if (p.producerId !== shop) return shop === '' ? true : false;
            return true;
          })
          .map((product) => (
            <div key={product._id}>
              <FoodCard
                product={product}
                checkedProduct={selectedProducts}
                onFoodClicked={onSelectProduct}
              />
            </div>
          ))}
      </Row>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, selectedProducts, shop]);

  return (
    <div className="container p-12 flex-fill  h-100 m-20 ">
      {foodLoading && <Spinner animation="border" variant="secondary" />}
      {showFoodLoadingErrors && (
        <div className="bg=denger col-6 col-sm-12"> Error loading goods!!!</div>
      )}
      {!foodLoading && !showFoodLoadingErrors && FoodCards}
    </div>
  );
};

export default ShopsPanel;
