import { UserInterface } from 'interfaces/user';
import { ToolInterface } from 'interfaces/tool';
import { GetQueryInterface } from 'interfaces';

export interface CustomerToolUsageInterface {
  id?: string;
  user_id: string;
  tool_id: string;
  usage_count?: number;
  last_used_at?: any;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  tool?: ToolInterface;
  _count?: {};
}

export interface CustomerToolUsageGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  tool_id?: string;
}
