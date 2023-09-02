import axios from 'axios';
import queryString from 'query-string';
import { CustomerToolUsageInterface, CustomerToolUsageGetQueryInterface } from 'interfaces/customer-tool-usage';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getCustomerToolUsages = async (
  query?: CustomerToolUsageGetQueryInterface,
): Promise<PaginatedInterface<CustomerToolUsageInterface>> => {
  const response = await axios.get('/api/customer-tool-usages', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createCustomerToolUsage = async (customerToolUsage: CustomerToolUsageInterface) => {
  const response = await axios.post('/api/customer-tool-usages', customerToolUsage);
  return response.data;
};

export const updateCustomerToolUsageById = async (id: string, customerToolUsage: CustomerToolUsageInterface) => {
  const response = await axios.put(`/api/customer-tool-usages/${id}`, customerToolUsage);
  return response.data;
};

export const getCustomerToolUsageById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/customer-tool-usages/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCustomerToolUsageById = async (id: string) => {
  const response = await axios.delete(`/api/customer-tool-usages/${id}`);
  return response.data;
};
