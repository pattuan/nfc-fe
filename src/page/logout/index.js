import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

const Logout = () => {
  const [cookies, setCookie, removeCookies] = useCookies(['token']);
  
  const handleLogout = () => {
    // Xóa cookie có tên 'token'
    removeCookies('token');
  };

  useEffect(() => {
    if (!cookies.token) {
      handleLogout();
      localStorage.removeItem('cart'); // Xóa localStorage khi đăng xuất
    }
  }, [cookies.token]);

  return handleLogout;
};

export default Logout;
