import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Logout = () => {
  const [cookies, removeCookies] = useCookies(['token']);
  
  
  const handleLogout = () => {
    // Xóa cookie có tên 'token'
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    // removeCookies('token');
    window.location.reload();
    return false;
  };

  return handleLogout;
};

export default Logout;