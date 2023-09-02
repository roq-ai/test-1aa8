import axios from 'axios';
import queryString from 'query-string';
import { ApiKeyInterface, ApiKeyGetQueryInterface } from 'interfaces/api-key';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getApiKeys = async (query?: ApiKeyGetQueryInterface): Promise<PaginatedInterface<ApiKeyInterface>> => {
  const response = await axios.get('/api/api-keys', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createApiKey = async (apiKey: ApiKeyInterface) => {
  const response = await axios.post('/api/api-keys', apiKey);
  return response.data;
};

export const updateApiKeyById = async (id: string, apiKey: ApiKeyInterface) => {
  const response = await axios.put(`/api/api-keys/${id}`, apiKey);
  return response.data;
};

export const getApiKeyById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/api-keys/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteApiKeyById = async (id: string) => {
  const response = await axios.delete(`/api/api-keys/${id}`);
  return response.data;
};
