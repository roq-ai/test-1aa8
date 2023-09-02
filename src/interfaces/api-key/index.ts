import { ToolInterface } from 'interfaces/tool';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ApiKeyInterface {
  id?: string;
  key_value: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  tool?: ToolInterface[];
  user?: UserInterface;
  _count?: {
    tool?: number;
  };
}

export interface ApiKeyGetQueryInterface extends GetQueryInterface {
  id?: string;
  key_value?: string;
  user_id?: string;
}
