import { LightUser } from './light-user';

export interface Comment {
  message: string;
  postedBy: LightUser;
  createdAt: number;
}
