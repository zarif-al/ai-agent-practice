export interface ChatListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
}

export interface SimplifiedChat {
  id: string;
  name: string;
  lastMessage: string;
  messageCount: number;
  lastUpdated: Date;
}
