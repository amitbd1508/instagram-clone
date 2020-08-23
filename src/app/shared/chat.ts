import { Friend } from './friend';

export interface Chat {
  type: string;
  chatId: string;
  message: string;
  sender: Friend;
  createdAt: number;
}
