'use client';

import { Building, MessageSquare } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from './data';
import { ChatModal } from '../ai-chat/chat-modal';
import { useState } from 'react';
import { ChatListModal } from '../ai-chat/list-modal';
import type { IChat } from '../ai-chat/interface';
import { NewChatModal } from '../ai-chat/new-chat';

interface IAppSidebarProps {
  chats: IChat[];
}

export function AppSidebar({ chats }: IAppSidebarProps) {
  const pathname = usePathname();
  const [isChatListOpen, setIsChatListOpen] = useState(false);
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<IChat | undefined>(
    undefined
  );

  // Handle opening the chat list
  const handleOpenChatList = () => {
    setIsChatListOpen(true);
  };

  // Handle selecting a chat from the list
  const handleSelectChat = (chatId: string) => {
    const chat = chats.find((chat) => chat.id === chatId);

    if (!chat) {
      console.error('handleSelectChat => Chat not found');
      return;
    }

    setSelectedChat(chat);
    setIsChatListOpen(false);
    setIsChatModalOpen(true);
  };

  // Handle opening the new chat modal
  const handleOpenNewChatModal = () => {
    setIsChatListOpen(false);
    setIsNewChatModalOpen(true);
  };

  // Handle creating a new chat
  const handleCreateNewChat = (chat: IChat) => {
    setSelectedChat(chat);
    setIsNewChatModalOpen(false);
    setIsChatModalOpen(true);
  };

  // Handle closing the chat modal
  const handleCloseChatModal = () => {
    setIsChatModalOpen(false);
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border h-14 flex justify-center">
        <div className="flex items-center gap-2">
          <Building className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold">HR Portal</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href)
                }
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <div className="mt-auto">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleOpenChatList}>
                <MessageSquare className="size-5" />
                <span>Chat with HR Assistant</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarRail />

      {/* Chat List Modal */}
      <ChatListModal
        isOpen={isChatListOpen}
        onClose={() => setIsChatListOpen(false)}
        onSelectChat={handleSelectChat}
        onNewChat={handleOpenNewChatModal}
        chats={chats.map((chat) => ({
          id: chat.id,
          name: chat.name,
          lastMessage:
            chat.messages[chat.messages.length - 1]?.content.substring(
              0,
              100
            ) || '',
          messageCount: chat.messages.length,
          lastUpdated:
            chat.messages[chat.messages.length - 1]?.created_at || new Date(),
        }))}
      />

      {/* New Chat Modal */}
      <NewChatModal
        isOpen={isNewChatModalOpen}
        onClose={() => setIsNewChatModalOpen(false)}
        onCreateChat={handleCreateNewChat}
      />

      {/* Chat Modal */}
      <ChatModal
        isOpen={isChatModalOpen}
        onClose={handleCloseChatModal}
        chat={selectedChat}
      />
    </Sidebar>
  );
}
