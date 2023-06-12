import { Button, Card } from 'react-bootstrap';
import { IProduct } from '../../models/IProduct';
import ImgBlur from '../ImgComponent/ImgBlur';

interface IProducerProps {
  product: IProduct;
  checkedProduct: string[];
  onFoodClicked: (selectedProducts: string[], shop: string) => void;
}

const ShopCard = ({
  product,
  checkedProduct,
  onFoodClicked,
}: IProducerProps) => {
  const { title, price, img } = product;
  return (
    <Card
      bg={checkedProduct.find((p) => p === product._id) ? 'light' : 'white'}
      className="shadow-sm mx-2 my-3"
    >
      <Card.Header>
        <ImgBlur name={img}></ImgBlur>
      </Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className=" text-end">price:{price}$</Card.Text>
      </Card.Body>
      <Card.Footer className="container d-flex justify-content-end">
        <span>
          <Button
            onClick={() => {
              onFoodClicked(
                [...checkedProduct, product._id],
                product.producerId,
              );
              const shop = localStorage.getItem('shop');

              const getStored = localStorage.getItem('ordered');
              if (shop === null) {
                localStorage.setItem('shop', product.producerId);
              }

              if (getStored === null) {
                localStorage.setItem('ordered', JSON.stringify([product._id]));
                localStorage.setItem(product._id, '1');
              } else {
                const orderedArray: string[] = JSON.parse(getStored);
                const index = orderedArray.indexOf(product._id);

                if (index === -1) {
                  orderedArray.push(product._id);
                  localStorage.setItem('ordered', JSON.stringify(orderedArray));
                  localStorage.setItem(product._id, '1');
                } else {
                  const getCount = localStorage.getItem(product._id);
                  if (getCount)
                    localStorage.setItem(
                      product._id,
                      String(parseInt(getCount) + 1),
                    );
                }
              }
            }}
          >
            Add to Cart
          </Button>
        </span>
      </Card.Footer>
    </Card>
  );
};

export default ShopCard;
