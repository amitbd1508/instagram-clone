import { Friend } from './friend';

export interface Chat {
  type: string;
  chatId: string;
  senderId: string;
  receiverId: string;
  message: string;
  userIds: string[];
  sender: Friend;
  receiver: Friend;
  createdAt: number;
}
