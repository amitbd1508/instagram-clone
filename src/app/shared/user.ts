import { Friend } from './friend';
import { Comment } from './comment';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  friends: Friend[];
  comments: Comment[];
  createdAt: number;
}
