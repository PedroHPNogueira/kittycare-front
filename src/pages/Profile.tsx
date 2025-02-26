import { FC } from 'react';
import {
  ChatroomLayout,
  SideBar,
  EditProfileField,
} from '../components/Chatroom';
/**
 * Profile page component that displays user profile editing interface
 * within the chatroom layout structure
 */
const Profile: FC = () => {
  return (
    <main className="flex h-full w-full">
      <ChatroomLayout>
        <SideBar />
        <EditProfileField />
      </ChatroomLayout>
    </main>
  );
};

export default Profile;
