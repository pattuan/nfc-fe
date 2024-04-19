import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Logout = () => {
  const [cookies, setCookie, removeCookies] = useCookies(['token']);
  
  
  const handleLogout = () => {
    // Xóa cookie có tên 'token'
    
    // document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    removeCookies('token');
    window.location.reload();
    return false;
  };

  return handleLogout;
};

export default Logout;