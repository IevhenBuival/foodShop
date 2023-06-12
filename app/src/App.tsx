import React, { useEffect, useState } from 'react';

import './custom.scss';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageContainer from './Pages/PageContainer';
import ShopPage from './Pages/ShopPage';
import CartPage from './Pages/CartPage';
import HistoryPage from './Pages/HistoryPage';
import NavBar from './components/NavBar';
import { IOrderRowWithPrice } from './models/IOrder';

const getItemsFromStorage = (timestamp: String = ''): IOrderRowWithPrice[] => {
  const storedOrderStr = localStorage.getItem('ordered');

  if (storedOrderStr !== null) {
    const storedOrder: string[] = JSON.parse(storedOrderStr);
    return storedOrder.map((el) => {
      const CountStr = localStorage.getItem(el);
      let count: number;
      if (CountStr === null) count = 0;
      else count = parseInt(CountStr);

      const item: IOrderRowWithPrice = {
        productID: el,
        count: count,
        price: 0,
      };
      console.log(item);
      return item;
    });
  }
  return [];
};
const ClobalTotal: IOrderRowWithPrice[] = getItemsFromStorage();

function App() {
  const [items, setItems] = useState(ClobalTotal);
  const [test, setTest] = useState('');
  function updateItems() {
    setTest(Date.now().toString());
  }

  useEffect(() => {
    setItems([...getItemsFromStorage('useEffect')]);
  }, [test]);
  return (
    <BrowserRouter>
      <div className="container-fluid vh-100 d-flex flex-column bg-white ">
        <header>
          <NavBar />
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <PageContainer>
                <ShopPage onCheckProd={updateItems} />
              </PageContainer>
            }
          />
          <Route
            path="/cart"
            element={
              <PageContainer>
                <CartPage products={[...items]} updateItems={updateItems} />
              </PageContainer>
            }
          />
          <Route
            path="/history"
            element={
              <PageContainer>
                <HistoryPage />
              </PageContainer>
            }
          />
          <Route
            path="/*"
            element={
              <PageContainer>
                <ShopPage onCheckProd={updateItems} />
              </PageContainer>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
