import { FC } from 'react';
import TopCorner from '/assets/svg/TopCorner.svg';
import BottomCorner from '/assets/svg/BottomCorner.svg';
import { ChatroomLayoutProps } from './types';
import { LAYOUT_CONSTANTS } from './constants';
import { CornerImage } from './CornerImage';

/**
 * ChatroomLayout component that provides the common layout structure
 * for the chatroom interface. It includes decorative corner images
 * and maintains proper z-indexing for content layering.
 *
 * @component
 * @param {ReactNode} children - The content to be rendered within the layout
 * @returns {JSX.Element} The rendered ChatroomLayout component
 */
const ChatroomLayout: FC<ChatroomLayoutProps> = ({ children }) => {
  return (
    <div className="relative h-[100dvh] w-full sm:w-screen">
      {/* Background container with corner decorations */}
      <div
        className="fixed right-0 top-0 -z-50 flex h-screen w-screen flex-col justify-between"
        style={{ backgroundColor: LAYOUT_CONSTANTS.BACKGROUND_COLOR }}
        aria-hidden="true"
      >
        {/* Top corner decoration */}
        <div className="top-0 flex justify-end">
          <div className="h-1/4 w-1/4 transition-all duration-300 md:w-auto lg:w-auto">
            <CornerImage
              src={TopCorner}
              alt="Top decorative corner"
              className="h-auto w-full"
            />
          </div>
        </div>

        {/* Bottom corner decoration */}
        <div className="flex items-end justify-end">
          <div className="w-1/3 transition-all duration-300 md:w-auto lg:w-auto">
            <CornerImage
              src={BottomCorner}
              alt="Bottom decorative corner"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 h-[100dvh] w-full">{children}</div>
    </div>
  );
};
export default ChatroomLayout;
