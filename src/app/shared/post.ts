import { User } from './user';
import { Comment } from './comment';

export interface Post {
  id: string;
  imageUrl: string;
  description: string;
  postedBy: User;
  createdAt: number;
  comments: Comment[];
}
