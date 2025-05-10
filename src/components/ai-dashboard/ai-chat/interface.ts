import type { Message } from 'ai';

export interface IChat {
  id: string;
  name: string;
  messages: Message[];
  createdAt: Date;
}
