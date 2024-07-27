import { AuthService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';

const LogoutBtn = () => {
  const router = useRouter();
  function handleLogout() {
    const authService = new AuthService();
    authService.logout();
    router.push('/signin');
  }
  return (
    <>
      <button
        aria-label="theme toggler"
        onClick={handleLogout}
        className="ml-2"
      >
        Log out
      </button>
    </>
  );
};
export default LogoutBtn;
