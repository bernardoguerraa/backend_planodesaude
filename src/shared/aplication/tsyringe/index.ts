import registerRepositories from './registration/repositories';

import registerAuthentication from './registration/authentication';

export default async function initialize(): Promise<void> {
  registerRepositories();

  registerAuthentication();
}
