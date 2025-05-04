import type { ChatMessageRoleEnum } from '@/db/schema/chat/messages';
import type { Message } from 'ai';

export interface IChat {
  id: string;
  name: string;
  messages: {
    id: string;
    created_at: Date;
    role: ChatMessageRoleEnum;
    content: string;
    parts: Message['parts'];
  }[];
  created_at: Date;
}
