import { useState } from 'react';
import { useAppDispatch } from '../../../Redux/hooks';
import {
  addMessage,
  sendChatMessageAsync,
} from '../../../Redux/features/chatSlice';
import { Message } from '../../../utils/types';
import RiveAnimation from '../../RiveAnimation';
import { HiOutlineArrowRight } from 'react-icons/hi2';
import React from 'react';

interface InputFieldProps {
  onTyping: boolean;
  messageList: Message[];
}

const InputField = ({ onTyping, messageList }: InputFieldProps) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setError('');
    setInput('');

    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.style.height = '66px';
    }

    const newMessage = {
      content: input,
      role: 'user',
    };

    dispatch(addMessage(newMessage));

    const catId = localStorage.getItem('catId');
    if (!catId) {
      setError('No cat found. Please try again later.');
      return;
    }

    const messagesForApi = [...messageList, newMessage].map(
      ({ role, content }) => ({
        role,
        content,
      }),
    );

    try {
      await dispatch(
        sendChatMessageAsync({
          catId: catId,
          messages: messagesForApi as Message[],
        }),
      ).unwrap();
    } catch (err: any) {
      setError(err.message || 'Failed to send message');
    }
  };

  return (
    <div className="w-full">
      {error && (
        <div className="mb-2 text-center text-sm text-red-500">{error}</div>
      )}
      <div className="relative flex w-full items-center">
        <div
          className={`h-20 ${onTyping ? 'w-20' : 'w-0'} absolute -top-[80%]`}
        >
          <RiveAnimation src="riv/V2/Typing_animation.riv" autoplay={true} />
        </div>
        <textarea
          aria-label="Chat message input"
          role="textbox"
          rows={1}
          className="h-auto max-h-[150px] min-h-[66px] w-full resize-none overflow-y-hidden rounded-[20px] border-2 bg-[#F3EDE8] !p-[20px] !pr-24 text-[14px] font-semibold text-opacity-30 focus:outline-none sm:p-6 sm:text-[16px]"
          placeholder="Type your question here…"
          onChange={(e) => {
            setInput(e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          value={input}
        />
        <button
          aria-label="Send message"
          className="absolute right-3 flex h-[38px] w-[50px] items-center justify-center rounded-md border-2 border-none bg-blue-600 text-white outline-none hover:bg-blue-400 active:bg-purple-700 sm:h-14 sm:w-20 sm:rounded-xl"
          onClick={handleSubmit}
        >
          <HiOutlineArrowRight className="text-md sm:text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default InputField;
