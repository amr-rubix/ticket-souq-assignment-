'use client';

import { AdminService } from '@/services/admin.service';
import AdminProfileCard from '@/components/AdminProfileCard';
import { useParams } from 'next/navigation';

const adminService = new AdminService();
const getUserData = async (id) => {
  return await adminService.getById(id);
};

const AdminUserPage = async () => {
  const { id } = useParams<{ id }>();
  const userData: any = await getUserData(id);
  const handleSave = async (data) => {
    delete data.email;
    await adminService.patch(data);
  };
  return (
    <>
      <AdminProfileCard userData={userData} save={handleSave} />
    </>
  );
};

export default AdminUserPage;
