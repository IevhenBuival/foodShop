export interface IProduct {
  _id: string;
  title: string;
  price: number;
  producerId: string;
  img: string;
}

export interface IProductWithCheck extends IProduct {
  check?: boolean;
}
