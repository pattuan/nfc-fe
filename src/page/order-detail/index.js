import React, { useEffect, useState } from "react";

import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

import config from "../../config";
import { useParams } from "react-router-dom";
import moment from 'moment-timezone';
import 'moment/locale/vi';

const OrderDetail = () => {

  const [data, setData] = useState();
  let { id } = useParams();

  useEffect(() => {

    console.log("id: ", id)

    // check
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        id: id
      }),
      redirect: "follow",
    };

    fetch(`${config.API}/v1/order/get`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.isSuccess) {

          setData(result.data)
        } else {
          alert(result);
        }
      })
      .catch((error) => console.error(error));

  }, [])


  return (
    data ? (
      <>
        <h1 style={{ textAlign: "center", marginTop: "20px" }}>Order</h1>

        <div>
          <h3 style={{ textAlign: "left", marginTop: "20px" }}>Order Id: {data._id}</h3>
          <h3 style={{ textAlign: "left", marginTop: "20px" }}>User email: {data.user_email}</h3>
          <h3 style={{ textAlign: "left", marginTop: "20px" }}>Time: {moment(data.createdAt).tz('Asia/Ho_Chi_Minh').locale('en').format('LLL')}</h3>
        </div>

        <section className="h-100 gradient-custom" style={{ backgroundColor: "#eee", padding: "20px", marginTop: "20px" }}>
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th scope="col">Image</th>
                <th scope='col'>Name</th>
                <th scope='col'>Price</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>Total</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {
                data.products.map((e, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <img src={e.image} alt={`Element${i}`} style={{ width: '100px', height: 'auto' }} />
                      </td>
                      <td>{e.title}</td>
                      <td>{e.quantity}</td>
                      <td>{e.price}</td>
                      <td>{e.quantity * e.price}</td>
                    </tr>
                  )
                })
              }
            </MDBTableBody>
          </MDBTable>
        </section>

        <div>
          <h1>Total: {data.total}</h1>
        </div>
      </>
    ) : (
      <>  </>
    )
  );
};

export default OrderDetail;
