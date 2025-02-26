import type { HeaderProps } from './Chatroom/ChatField/types';
import { useEffect } from 'react';
import KittyLogo from './KittyLogo';

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  useEffect(() => {
    // get current url
    const url = window.location.pathname;
    const isChatroom = url.includes('cat-assistant');

    // Only render header in chatroom
    if (!isChatroom) return;
  }, []);

  return (
    <div className="flex h-fit w-full items-center justify-center">
      <div>
        {/* <a href="/"> */}
        <header
          className={`relative m-auto -mb-20 h-[240px] w-[400px] sm:mt-0 sm:h-[200px] sm:w-[900px] ${className}`}
          data-testid="kitty-logo"
        >
          <KittyLogo />
        </header>
        {/* </a> */}
      </div>
    </div>
  );
};

export default Header;
