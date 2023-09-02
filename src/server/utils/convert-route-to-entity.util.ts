const mapping: Record<string, string> = {
  'api-keys': 'api_key',
  'customer-tool-usages': 'customer_tool_usage',
  invites: 'invite',
  organizations: 'organization',
  tools: 'tool',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
