import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, Col, Row, Spinner } from 'react-bootstrap';
import { IProduct } from '../../models/IProduct';
import * as FoodApi from '../../hooks/foodShop.api';
import { IOrderRowWithPrice } from '../../models/IOrder';
import ImgBlur from '../ImgComponent/ImgBlur';
interface IOrderCard {
  item: IOrderRowWithPrice;

  setTotal: {
    increment: (item: IOrderRowWithPrice) => void;
    decrement: (item: IOrderRowWithPrice) => void;
    priceSet: (item: IOrderRowWithPrice, price: number) => void;
  };
}

const OrderCard = ({ item, setTotal }: IOrderCard) => {
  const [product, setProduct] = useState<IProduct>();
  const [count, setCount] = useState<string>('0');

  const [showFoodLoadingErrors, setShowFoodLoadingErrors] = useState(false);
  const [foodLoading, setFoodLoading] = useState(true);

  useEffect(() => {
    async function LoadProduct() {
      try {
        const resProduct = await FoodApi.getProduct(item.productID);
        setShowFoodLoadingErrors(false);
        setFoodLoading(true);
        setProduct(resProduct);

        setTotal.priceSet(item, resProduct.price);
      } catch (error) {
        console.error(error);
        setShowFoodLoadingErrors(true);
      } finally {
        setFoodLoading(false);
      }
    }
    const OrderRows = (): string => {
      const ordersCount = localStorage.getItem(item.productID);
      if (ordersCount === null) return '0';

      return ordersCount;
    };
    LoadProduct();
    const storedCount = OrderRows();
    setCount(storedCount);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {foodLoading && <Spinner animation="border" variant="primary" />}
      {showFoodLoadingErrors && (
        <div className="bg=denger">
          {' '}
          Error loading goods order!!! {item.productID}
        </div>
      )}

      {!foodLoading && !showFoodLoadingErrors && (
        <Card
          bg={'light border border-primary'}
          className="shadow-sm mx-1 my-2"
        >
          <Card.Body>
            <Row xs={2} md={2} xl={2}>
              <div>
                {product?.img && <ImgBlur name={product?.img}></ImgBlur>}
              </div>
              <div className=" text-end">
                <Card.Title>{product?.title}</Card.Title>
                <Card.Text className=" text-end">
                  price:{product?.price}$
                </Card.Text>
                <ButtonGroup>
                  <Button
                    className=" text-end bg-dark text-light border-dark"
                    onClick={() => {
                      localStorage.setItem(
                        item.productID,
                        String(parseInt(count) - 1),
                      );
                      if (parseInt(count) === 1 && product?._id !== undefined) {
                        localStorage.removeItem(product?._id);

                        const ordered = localStorage.getItem('ordered');
                        if (ordered !== null) {
                          const orderarr: string[] = JSON.parse(ordered);

                          localStorage.setItem(
                            'ordered',
                            JSON.stringify(
                              orderarr.filter((str) => str !== product?._id),
                            ),
                          );
                        }
                      }

                      setCount(String(parseInt(count) - 1));
                      setTotal.decrement(item);
                    }}
                  >
                    -
                  </Button>
                  <Button
                    className=" text-end bg-light "
                    disabled={true}
                    onClick={() => {}}
                  >
                    {count}
                  </Button>
                  <Button
                    className=" text-end bg-primary border-dark"
                    onClick={() => {
                      setCount(String(parseInt(count) + 1));
                      localStorage.setItem(
                        item.productID,
                        String(parseInt(count) + 1),
                      );
                      setTotal.increment(item);
                    }}
                  >
                    +
                  </Button>
                </ButtonGroup>
              </div>
            </Row>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default OrderCard;
