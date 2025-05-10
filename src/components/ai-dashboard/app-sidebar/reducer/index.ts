import type { AIModalReducerActions, AIModalReducerState } from './interface';

export function aiModalReducer(
  state: AIModalReducerState,
  action: AIModalReducerActions
): AIModalReducerState {
  switch (action.type) {
    case 'change_modal':
      return {
        ...state,
        modalType: action.payload.type,
        activeChatId:
          action.payload.type === 'chatModal'
            ? action.payload.chatId
            : undefined,
      };
    default:
      return state;
  }
}
