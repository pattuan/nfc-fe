import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [cookies, setCookie, removeCookies] = useCookies(['token', 'user']);
  
  const navigate = useNavigate();
  const handleLogout = () => {

    // Xóa cookie có tên 'token'
    removeCookies('token');
    removeCookies('user');
    localStorage.removeItem('cart'); // Xóa localStorage khi đăng xuất

    // Chuyển trang

    navigate('/login');
  };

  useEffect(() => {
    if (!cookies.token) {
      handleLogout();
    }
  }, []);

  return handleLogout;
};

export default Logout;
