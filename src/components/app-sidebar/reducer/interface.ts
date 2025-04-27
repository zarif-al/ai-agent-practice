type AIModalTypes = 'chatList' | 'chatModal' | 'newChat' | undefined;

export type AIModalReducerActions = {
  type: 'change_modal';
  payload:
    | { type: 'chatList' | 'newChat' | undefined }
    | { type: 'chatModal'; chatId: string };
};

export interface AIModalReducerState {
  modalType: AIModalTypes;
  activeChatId?: string;
}
