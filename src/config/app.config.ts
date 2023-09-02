interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Admin User'],
  customerRoles: ['Customer'],
  tenantRoles: ['Admin User', 'Backend Developer', 'Frontend Developer'],
  tenantName: 'Organization',
  applicationName: 'test',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Use the chat gpt prompt generator tool',
    'Generate chat gpt prompts',
    'Run the chat gpt prompts',
  ],
  ownerAbilities: [
    'Manage the API key for chat gpt prompt generator tool',
    'Store the API key in the backend',
    'Invite Backend Developer and Frontend Developer to the application',
    "Delete the API key in the backend when it's no longer needed",
  ],
};
