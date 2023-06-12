import { ICustomer } from "../models/ICustomer";
import { IOrder } from "../models/IOrder";
import { IProducer } from "../models/IProducer";
import { IProduct } from "../models/IProduct";
import { ConflictError, UnauthorizedError } from "./errors/http_errors";

export interface ICustomerInput {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface IOrderInput {
  customerId?: string;
  producerId?: string;
  products?: {
    productId?: string;
    count?: string;
  }[];
}

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);

  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    if (response.status === 401) {
      throw new UnauthorizedError(errorMessage);
    } else if (response.status === 409) {
      throw new ConflictError(errorMessage);
    } else {
      throw Error(
        "Request failed.Status:" + response.status + ". Error:" + errorMessage
      );
    }
  }
}

export async function getProducers(): Promise<IProducer[]> {
  const response = await fetchData("/api/producers", { method: "GET" });
  return response.json();
}

export async function getProducts(): Promise<IProduct[]> {
  const response = await fetchData("/api/products", { method: "GET" });
  return response.json();
}

export async function getProduct(id: string): Promise<IProduct> {
  const response = await fetchData(`/api/products/${id}`, { method: "GET" });
  return response.json();
}

export async function putCustomer(
  customer: ICustomerInput
): Promise<ICustomer> {
  const response = await fetchData("/api/customers/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });

  return response.json(); //await
}

export async function createOrder(order: IOrderInput): Promise<IOrder> {
  const response = await fetchData("/api/customers/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  return response.json(); //await
}
