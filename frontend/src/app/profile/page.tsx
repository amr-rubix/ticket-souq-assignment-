'use client';

import { UserService } from '@/services/user.service';
import UserCard from '@/components/UserCard';

const userService = new UserService();
const getUserData = async () => {
  return await userService.me();
};

const ProfilePage = async () => {
  const userData: any = await getUserData();

  function handleUpdate(userData) {
    userService.update(userData);
  }
  return (
    <>
      <UserCard userData={userData?.data} update={handleUpdate} />
    </>
  );
};

export default ProfilePage;
