import axios from 'axios';
import queryString from 'query-string';
import { InviteInterface, InviteGetQueryInterface } from 'interfaces/invite';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getInvites = async (query?: InviteGetQueryInterface): Promise<PaginatedInterface<InviteInterface>> => {
  const response = await axios.get('/api/invites', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createInvite = async (invite: InviteInterface) => {
  const response = await axios.post('/api/invites', invite);
  return response.data;
};

export const updateInviteById = async (id: string, invite: InviteInterface) => {
  const response = await axios.put(`/api/invites/${id}`, invite);
  return response.data;
};

export const getInviteById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/invites/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteInviteById = async (id: string) => {
  const response = await axios.delete(`/api/invites/${id}`);
  return response.data;
};
