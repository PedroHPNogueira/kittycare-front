import { useEffect, useRef } from 'react';
import CatinChat from '/assets/svg/catInChat.svg';
import { Message } from '../../../utils/types';

interface MessageBoxesProps {
  messageList: Message[];
  response: string;
}

const MessageBoxes: React.FC<MessageBoxesProps> = ({
  messageList,
  response,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    scrollContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList, response]);

  return (
    <div className="flex w-full flex-1 flex-col overflow-y-auto overflow-x-hidden">
      {messageList.length > 0 ? (
        <>
          <div className="flex-grow">
            <div className="flex flex-col">
              <div>
                {messageList.map((message, index) => (
                  <div key={index} className="w-full">
                    <div
                      className={`my-2 flex w-[90%] gap-4 rounded-2xl p-6 sm:my-4 sm:w-2/3 sm:p-8 ${
                        message.role === 'user'
                          ? 'float-end bg-[#F3EDE8] text-right'
                          : 'bg-[#FADFC9]'
                      }`}
                    >
                      {!message.role && (
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#FFA500] sm:h-8 sm:w-8">
                          <img src={CatinChat} alt="CatinChat" />
                        </span>
                      )}
                      <span
                        className={`${
                          message.role ? 'w-full' : 'w-[90%]'
                        } whitespace-pre-wrap break-words text-[14px] font-medium sm:text-[18px]`}
                      >
                        {message.content}
                      </span>
                    </div>
                  </div>
                ))}
                {response && (
                  <div className="w-full">
                    <div className="my-2 flex w-[90%] gap-4 rounded-2xl bg-[#FADFC9] p-6 sm:my-4 sm:w-2/3 sm:p-8">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#FFA500] sm:h-8 sm:w-8">
                        <img src={CatinChat} alt="CatinChat" />
                      </span>
                      <span className="w-[90%] whitespace-pre-wrap break-words text-[14px] font-medium sm:text-[18px]">
                        {response}
                      </span>
                    </div>
                  </div>
                )}
                <div ref={scrollContainerRef}></div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex h-full items-center justify-center">
          <div className="mb-40 h-10 w-full">
            <div className="flex h-[200px] items-center justify-center">
              <img src="/assets/png/chat-expert.png" width={200} height={200} />
            </div>
            <div className="w-full text-center text-[18px] font-bold sm:text-[28px] sm:font-semibold">
              Hello, I'm your dedicated expert here to assist you. <br /> Let me
              know your concerns below.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBoxes;
