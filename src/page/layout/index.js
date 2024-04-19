// import { Outlet, Link } from "react-router-dom";
import { Outlet, Link, Route } from "react-router-dom";
import Banner from "../../component/banner"; // Import Banner component

const Layout = () => {

  return (

    <>
      <Banner />
      <Outlet />
      
    </>
  );
};

export default Layout;
