import { useEffect, useState } from 'react';
import { Button, Container, Form, FormGroup } from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import ClientForm from '../components/CartPages/ClientForm';
import config from 'dotenv';
import OrderTable from '../components/CartPages/OrderTable';
import {
  AccessError,
  ConflictError,
  InvalidId,
  NotFoundError,
} from '../hooks/errors/http_errors';
import * as FoodApi from '../hooks/foodShop.api';
import { IOrderRowWithPrice } from '../models/IOrder';

import styles from './PagesStyles.module.css';

interface ICartPageProps {
  products: IOrderRowWithPrice[];
  updateItems: () => void;
}

const CartPage = ({ products, updateItems }: ICartPageProps) => {
  const [ordered, setOrdered] = useState('');
  const [items, setItems] = useState<IOrderRowWithPrice[]>(products);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [myError, setMyError] = useState('');

  const resetTotal = {
    increment: (item: IOrderRowWithPrice) => {
      let index = items.indexOf(item);
      item.count = item.count + 1;
      items[index] = item;
      setItems([...products]);
    },
    decrement: (item: IOrderRowWithPrice) => {
      let index = items.indexOf(item);
      item.count = item.count - 1;
      if (item.count === 0) {
        setItems([...products.filter((e) => e.productID !== item.productID)]);
        updateItems();
      } else {
        items[index] = item;
        setItems([...products]);
      }
    },
    priceSet: (item: IOrderRowWithPrice, newPrice: number) => {
      let index = items.indexOf(item);
      item.price = newPrice;
      items[index] = item;
      setItems([...products]);
    },
  };
  useEffect(() => {
    setTotalPrice(
      items.reduce((total, str) => total + str.count * str.price, 0),
    );
  }, [items]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FoodApi.ICustomerInput>({
    defaultValues: {
      email: '',

      phone: '',
    },
  });

  //send order on server
  async function onSubmit(input: FoodApi.ICustomerInput) {
    try {
      const customerResponce = await FoodApi.putCustomer(input);

      const ordered = localStorage.getItem('ordered');

      if (ordered && ordered !== '[]') {
        const shop = localStorage.getItem('shop');
        if (!shop)
          throw Error(
            'Shop is not selested, please go to Shop tab and select the shop',
          );
        const order: string[] = JSON.parse(ordered);
        const orderStr: { productId: string; count: string }[] = [];
        order.forEach((position) => {
          const productcountstr = localStorage.getItem(position);

          if (productcountstr) {
            orderStr.push({
              productId: position,
              count: productcountstr,
            });
          }
        });
        const orderInput: FoodApi.IOrderInput = {
          producerId: shop,
          customerId: customerResponce._id,
          products: orderStr,
        };
        const orderResponce = await FoodApi.createOrder(orderInput);
        localStorage.clear();
        localStorage.setItem('contact', customerResponce._id);
        setOrdered(JSON.stringify(orderResponce));
      } else {
        throw new Error('Order has no products');
      }
    } catch (error) {
      if (
        error instanceof AccessError ||
        error instanceof ConflictError ||
        error instanceof InvalidId ||
        error instanceof NotFoundError ||
        error instanceof Error
      ) {
        setMyError(error.message);
      } else {
        setMyError(JSON.stringify(error));
        alert(error);
      }

      console.error(error);
    }
  }
  function onChange() {
    console.log('Captcha value:');
    const handle = handleSubmit(onSubmit);
    handle();
  }
  return (
    <>
      {ordered === '' && (
        <Form
          className="bg=light m-3 h-100 d-flex flex-column container-fluid"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={`${styles.Row} container-fluid h-100  bg-white`}>
            <div className={`${styles.ShopsPanel}   mh-100 flex-shrink-0`}>
              <div className="container-fluid m=3 border border-dark rounded bg-light">
                <ClientForm myregister={register} errors={errors} />
              </div>
            </div>
            <div
              className={`${styles.OrderTable} border border-dark rounded   d-flex flex-column mh-100 flex-shrink-1`}
            >
              <Container className={`${styles.Orders} bg-light  my-3`}>
                <OrderTable items={items} setTotal={resetTotal} />
              </Container>
              <FormGroup className=" bg-light m-3 d-flex flex-row justify-content-end flex-shrink-0">
                {myError && errors && (
                  <Form.Label className="mb-3 mt-3 ml-5  bg-danger p-2">
                    {'Error:' + myError}
                  </Form.Label>
                )}

                <Form.Label className="mb-3 mt-3 ml-5 p-2">
                  Total:{totalPrice}$
                </Form.Label>
                <div className="align-self-center  p-2">
                  <Button
                    type="submit"
                    className="btn btn-outline-dark  "
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </div>
                <ReCAPTCHA
                  sitekey={process.env.REACT_APP_CAPCHAKEY || ''}
                  onChange={onChange}
                />
              </FormGroup>
            </div>
          </div>
        </Form>
      )}
      {ordered !== '' && (
        <div>
          <div>Thank you for the order. Go to history to see details</div>
          <Navigate to="/history" />;
        </div>
      )}
    </>
  );
};

export default CartPage;
