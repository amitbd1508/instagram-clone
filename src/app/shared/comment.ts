import { User } from './user';

export interface Comment {
  message: string;
  postedBy: User;
  createdAt: number;
}
