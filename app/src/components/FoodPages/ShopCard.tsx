import { Card } from 'react-bootstrap';
import { IProducer } from '../../models/IProducer';

interface IProducerProps {
  producer: IProducer;
  checkedValue: string;

  onShopClicked: (word: string) => void;
}

const ShopCard = ({
  producer,
  checkedValue,
  onShopClicked,
}: IProducerProps) => {
  const { name } = producer;
  return (
    <Card
      bg={checkedValue !== producer._id ? 'primary' : 'dark'}
      className={`mb-3 mr-2 ml-2 ${
        checkedValue !== producer._id ? 'text-dark' : 'text-light'
      }`}
      onClick={() => {
        const ordered = localStorage.getItem('ordered');
        const shop = localStorage.getItem('shop');

        if (
          (localStorage.length === 1 && localStorage.key(0) === 'shop') ||
          localStorage.getItem('ordered') === null ||
          localStorage.getItem('ordered') === '[]' ||
          localStorage.getItem('shop') === null
        ) {
          localStorage.setItem('shop', producer._id);

          onShopClicked(producer._id);
        } else {
          alert(
            'You can order only from one Shop. Complete order from current shop or empty Shoping cart to order from other shop',
          );
        }
      }}
    >
      <Card.Body>
        <Card.Title>{name}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default ShopCard;
