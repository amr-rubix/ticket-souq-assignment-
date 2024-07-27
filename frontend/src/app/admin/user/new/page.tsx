'use client';
import { AdminService } from '@/services/admin.service';
import AdminUserCard from '@/components/AdminUserCard';

const AdminNewUserPage = async () => {
  const adminService = new AdminService();
  const handleSave = async (data) => {
    await adminService.post(data);
  };

  return (
    <>
      <AdminUserCard save={handleSave} />
    </>
  );
};

export default AdminNewUserPage;
