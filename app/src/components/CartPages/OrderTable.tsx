import { Row } from 'react-bootstrap';
import { IOrderRowWithPrice } from '../../models/IOrder';

import OrderCard from './OrderCard';
interface IOrderTable {
  items: IOrderRowWithPrice[];
  setTotal: {
    increment: (item: IOrderRowWithPrice) => void;
    decrement: (item: IOrderRowWithPrice) => void;
    priceSet: (item: IOrderRowWithPrice, price: number) => void;
  };
}

const OrderTable = ({ items, setTotal }: IOrderTable) => {
  return (
    <div className="container p-12 flex-fill  h-100 m-20 border border-primary rounded">
      <Row xs={1} md={1} xl={2} className="mx-1 my-1">
        {items.map((e) => (
          <div key={e.productID}>
            <OrderCard item={e} setTotal={setTotal} />
          </div>
        ))}
      </Row>
    </div>
  );
};

export default OrderTable;
