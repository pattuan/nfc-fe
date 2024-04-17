import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import { CookiesProvider, useCookies } from "react-cookie";

import { Link, redirect } from "react-router-dom";
import register from "../../page/register";
import { useEffect } from "react";

function App() {
  const [ email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);

  useEffect(()=>{
    if (!!cookies.token){
      redirect('/')
    }
  })

  function login() {
    var isSuccess = false;

    // validate
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // check
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: email,
      password: password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    // console.log("go login")
    fetch("https://iot-be-y8op.onrender.com/v1/auth/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.isSuccess) {
          setCookie("token", result.token);
          redirect('/home')
        } else {
          alert(result.message);
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Email address"
                id="formControlLg"
                type="email"
                size="lg"
                style={{ color: "white" }}
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
                style={{ color: "white" }}
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              
              <MDBBtn
                
                outline
                className="mx-2 px-5"
                color="white"
                size="lg"
                onClick={() => login()}
              >
                Login
              </MDBBtn>
              
              <div className="text-center"></div>
              <p><a></a></p>
              <p>Not a member? <Link to="/register" >Register</Link></p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
