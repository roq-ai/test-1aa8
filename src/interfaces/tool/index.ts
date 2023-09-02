import { CustomerToolUsageInterface } from 'interfaces/customer-tool-usage';
import { ApiKeyInterface } from 'interfaces/api-key';
import { GetQueryInterface } from 'interfaces';

export interface ToolInterface {
  id?: string;
  name: string;
  description?: string;
  api_key_id: string;
  created_at?: any;
  updated_at?: any;
  customer_tool_usage?: CustomerToolUsageInterface[];
  api_key?: ApiKeyInterface;
  _count?: {
    customer_tool_usage?: number;
  };
}

export interface ToolGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  api_key_id?: string;
}
