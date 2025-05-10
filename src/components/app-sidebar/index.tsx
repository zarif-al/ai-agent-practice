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
import { navItems } from './nav-items';
import { ChatModal } from '../ai-chat/chat-modal';
import { useReducer } from 'react';
import { ChatListModal } from '../ai-chat/list-modal';
import { NewChatModal } from '../ai-chat/new-chat';
import { aiModalReducer } from './reducer';

export function AppSidebar() {
  const pathname = usePathname();
  const [state, dispatch] = useReducer(aiModalReducer, {
    modalType: undefined,
    activeChatId: undefined,
  });

  function openChatModal(chatId: string) {
    dispatch({
      type: 'change_modal',
      payload: { type: 'chatModal', chatId },
    });
  }

  function toggleChatList() {
    if (state.modalType === 'chatList') {
      dispatch({
        type: 'change_modal',
        payload: { type: undefined },
      });
    } else {
      dispatch({
        type: 'change_modal',
        payload: { type: 'chatList' },
      });
    }
  }

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
              <SidebarMenuButton asChild isActive={pathname === item.href}>
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
              <SidebarMenuButton onClick={toggleChatList}>
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
        isOpen={state.modalType === 'chatList'}
        onClose={toggleChatList}
        onSelectChat={(chatId) => {
          openChatModal(chatId);
        }}
        onNewChat={() => {
          dispatch({
            type: 'change_modal',
            payload: { type: 'newChat' },
          });
        }}
      />

      {/* New Chat Modal */}
      <NewChatModal
        isOpen={state.modalType === 'newChat'}
        onClose={toggleChatList}
        onCreateChat={(chat) => {
          openChatModal(chat.id);
        }}
      />

      {/* Chat Modal */}
      <ChatModal
        isOpen={state.modalType === 'chatModal'}
        onClose={toggleChatList}
        selectedChatId={state.activeChatId}
      />
    </Sidebar>
  );
}
