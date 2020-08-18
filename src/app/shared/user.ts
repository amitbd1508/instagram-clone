import { Friend } from './friend';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  friends: Friend[],
  createdAt: number;
}
