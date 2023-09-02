import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface InviteInterface {
  id?: string;
  invited_user_id: string;
  inviting_user_id: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;

  user_invite_invited_user_idTouser?: UserInterface;
  user_invite_inviting_user_idTouser?: UserInterface;
  organization?: OrganizationInterface;
  _count?: {};
}

export interface InviteGetQueryInterface extends GetQueryInterface {
  id?: string;
  invited_user_id?: string;
  inviting_user_id?: string;
  organization_id?: string;
}
