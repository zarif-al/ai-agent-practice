export interface ChatListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  chats: SimplifiedChat[];
}

interface SimplifiedChat {
  id: string;
  name: string;
  lastMessage: string;
  messageCount: number;
  lastUpdated: Date;
}
