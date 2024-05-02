import React, { useEffect, useState } from "react";

import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdb-react-ui-kit';
import { useCookies } from "react-cookie";
import config from "../../config";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import moment from 'moment-timezone';
import 'moment/locale/vi';


const OrderMe = () => {

  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isChangeCart, setIsChangeCart] = useState(false)
  const [total, setTotal] = useState(0)
  const [cookies, setCookie] = useCookies(["user"]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.token) {
      navigate("/login");
      alert("Please Login Or Register!");
      window.location.reload();
    }
  }, [cookies.token, navigate]);

  useEffect(() => {

    // check
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", `Bearer ${cookies.token}`);

    const raw = JSON.stringify({
      user_id: cookies.user._id,
      user_email: cookies.user.email,
      products: cartItems,
      total: total,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${config.API}/v1/order/me`, requestOptions)
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
              total: e.total,
              time: moment(e.createdAt).tz('Asia/Ho_Chi_Minh').locale('en').format('LLL'),
            }
          }))
        } else {
          alert(result);
        }
      })
      .catch((error) => console.error(error));

  }, [cookies])

  // Hàm remove product khi thông tin đã cũ
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
              <th scope='col'>Total</th>
              <th scope='col'>Time</th>
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
                    <td>{e.total}</td>
                    <td>{e.time}</td>
                    <th>
                      <MDBBtn outline color="dark" size="sm" onClick={() => handleRemove(e.id)}>
                        REMOVE
                      </MDBBtn>
                    </th>
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

export default OrderMe;
