import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../Redux/hooks';
import { updateConversationAsync } from '../../../Redux/features/chatSlice';
import InputField from './InputField';
import MessageBoxes from './MessageBoxes';
import ErrorMessage from './ErrorMessage';
import Header from '../../Header';
import type { ChatFieldProps } from './types';

const ChatField: React.FC<ChatFieldProps> = () => {
  const { messages, isLoading, needsSync, error } = useAppSelector(
    (state) => state.chat,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (needsSync && messages.length > 0) {
      dispatch(updateConversationAsync({ messages }));
    }
  }, [needsSync, messages, dispatch]);

  return (
    <div className="mx-auto flex h-full max-w-full flex-col p-4 pb-6 sm:w-[800px]">
      {error && <ErrorMessage message={error} />}
      <Header />
      <MessageBoxes messageList={messages} response={''} />
      <InputField onTyping={isLoading} messageList={messages} />
    </div>
  );
};

export default ChatField;
