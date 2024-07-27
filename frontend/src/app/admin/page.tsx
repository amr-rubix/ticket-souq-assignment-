'use client';

import { AdminService } from '@/services/admin.service';
import UsersCard from '@/components/UsersCard';

const adminService = new AdminService();
const getUsersData = async () => {
  return await adminService.get();
};

const AdminPage = async () => {
  const usersData: any = await getUsersData();
  return (
    <>
      <UsersCard usersData={usersData} />
    </>
  );
};

export default AdminPage;
