import { AppPaths } from '../constants/app-paths';

const DEFAULT_RETURN_URL = `/${AppPaths.tickets}`;

export function toSafeReturnUrl(returnUrl: string | undefined): string {
  const isInternalPath = !!returnUrl && returnUrl.startsWith('/') && !returnUrl.startsWith('//');
  return isInternalPath ? returnUrl : DEFAULT_RETURN_URL;
}
