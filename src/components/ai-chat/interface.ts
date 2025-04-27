import type { ChatMessageRoleEnum } from '@/db/schema/chat/messages';

export interface IChat {
  id: string;
  name: string;
  messages: {
    id: string;
    created_at: Date;
    role: ChatMessageRoleEnum;
    content: string;
  }[];
  created_at: Date;
}
