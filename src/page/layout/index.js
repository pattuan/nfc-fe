// import { Outlet, Link } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import Banner from "../../component/banner"; // Import Banner component

const Layout = () => {
  return (
    <>
      <Banner /> {/* Sử dụng Banner ở đây */}
      <Outlet />
    </>
  );
};

export default Layout;
