import { useEffect, useState } from "react";
import { Col, Spinner } from "react-bootstrap";
import { IProducer } from "../../models/IProducer";
import * as FoodApi from "../../hooks/foodShop.api";
import ShopCard from "./ShopCard";

interface IShopPanelProps {
  shop: string;
  setShop: (shop: string) => void;
}
const ShopsPanel = ({ shop, setShop }: IShopPanelProps) => {
  const [producers, setProducers] = useState<IProducer[]>([]);
  const [showWrdLoadingErrors, setShowWrdLoadingErrors] = useState(false);
  const [shopLoading, setShopLoading] = useState(true);

  useEffect(() => {
    async function LoadProducers() {
      try {
        const resProducers = await FoodApi.getProducers();
        setShowWrdLoadingErrors(false);
        setShopLoading(true);
        setProducers(resProducers);
      } catch (error) {
        console.error(error);
        setShowWrdLoadingErrors(true);
      } finally {
        setShopLoading(false);
      }
    }
    LoadProducers();
  }, []);

  return (
    <Col className="col p-4 flex-fill  h-100 m-20">
      {shopLoading && <Spinner animation="border" variant="primery" />}
      {showWrdLoadingErrors && (
        <div className="bg=denger"> Error loading shops!!!</div>
      )}

      {producers.map((producer) => (
        <ShopCard
          key={producer._id}
          producer={producer}
          checkedValue={shop}
          onShopClicked={setShop}
        />
      ))}
    </Col>
  );
};

export default ShopsPanel;
