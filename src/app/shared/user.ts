import { Friend } from './friend';
import { Comment } from './comment';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  primaryPhotoURL: string;
  secondaryPhotoURL: string;
  emailVerified: boolean;
  friends: Friend[];
  comments: Comment[];
  language: string;
  designation: string;
  bio: string;
  createdAt: number;
}

export enum ImageType {
  PROFILE = 'profile-photo',
  PRIMARY = 'primary-photo',
  SECONDARY = 'secondary-photo'
}
