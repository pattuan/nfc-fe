import React, { useEffect, useState } from "react";

import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdb-react-ui-kit';

import config from "../../config";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Order = () => {
  const [cookies, setCookie] = useCookies(["user"]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra xem người dùng có phải là admin@gmail.com không
    if (cookies.user.email !== "admin@gmail.com") {
      // Nếu không phải, chuyển hướng đến trang chính hoặc trang khác
      navigate("/");
      console.log(cookies.user.email)
      return;
    }
    
  }, [cookies.user, navigate]);

  useEffect(() => {

    // check
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${config.API}/v1/order/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if (result.isSuccess) {
          setData(result.data.map(e => {

            var productNames = []
            e.products.forEach(e => {
              productNames.push(<>{`${e.title}(${e.quantity})`} <br></br></>)
            })
            return {
              id: e._id,
              name: productNames,
              userEmail: e.user_email,
              total: e.total
            }
          }))
        } else {
          alert(result);
        }
      })
      .catch((error) => console.error(error));

  }, [])
  const handleRemove = (id) => {
    // Gửi yêu cầu HTTP DELETE tới endpoint API để xóa đơn hàng từ MongoDB
    const requestOptions = {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' }
    };
  
    fetch(`${config.API}/v1/order/me/${id}`, requestOptions)
      .then((response) => response.json())
      .then(result => {
        if (result.isSuccess) {
          // Nếu xóa thành công từ MongoDB, cập nhật state của ứng dụng React
          setData(prevData => prevData.filter(e => e.id !== id));
        } else {
          alert(result);
        }
      })
      .catch(error => console.error("Lỗi khi xóa đơn hàng:", error));
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Order</h1>


      <section className="h-100 gradient-custom" style={{ backgroundColor: "#eee", padding: "20px", marginTop: "20px" }}>
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th scope='col'>Order Id</th>
              <th scope='col'>Products</th>
              <th scope='col'>User Email</th>
              <th scope='col'>Total</th>
              <th></th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {
              data.map((e, i) => {
                return (
                  <tr key={i}>
                    <th scope='row'>{e.id}</th>
                    <td>{e.name}</td>
                    <td>{e.userEmail}</td>
                    <td>{e.total}</td>
                    <td><Link to={`/order/${e.id}`}>Detail</Link></td>
                    <td>
                      <MDBBtn outline color="dark" size="sm" onClick={() => handleRemove(e.id)}>
                        REMOVE
                      </MDBBtn>
                    </td>
                  </tr>
                )
              })
            }
          </MDBTableBody>
        </MDBTable>
      </section>
    </>
  );
};

export default Order;
