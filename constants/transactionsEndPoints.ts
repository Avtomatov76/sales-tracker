import GetConfiguration from "./Config";
import {
  customersAPI,
  vendorsAPI,
  suppliersAPI,
  travelTypesAPI,
  transactionsAPI,
  productsAPI,
  destinationsAPI,
  getProductsData,
} from "../api/endPoints";

const baseURL = GetConfiguration().baseUrl;

export const TRANSACTION_END_POINTS = [
  baseURL + customersAPI,
  baseURL + vendorsAPI,
  baseURL + suppliersAPI,
  baseURL + travelTypesAPI,
  baseURL + transactionsAPI,
  baseURL + productsAPI,
  baseURL + destinationsAPI,
  baseURL + getProductsData,
];
