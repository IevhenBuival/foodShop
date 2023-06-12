export interface IOrderRow {
  productID: string;
  count: number;
}
export interface IOrderRowWithPrice extends IOrderRow {
  price: number;
}
export interface IOrder {
  _id: string;
  customerID: string;
  producerID: string;
  products: IOrderRow[];
}
