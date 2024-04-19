import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
} from "mdb-react-ui-kit";

export default function ProductCard({ title, desc, price, image, addToCart }) {
  const productItem = { title, desc, price, image };

  const handleAddToCart = () => {
    addToCart(productItem);
  };

  return (
    <MDBCard style={{ maxWidth: "40rem", marginTop: "15px" }}>
      <MDBRipple
        rippleColor="light"
        rippleTag="div"
        className="bg-image hover-overlay"
      >
        <MDBCardImage src={image} fluid alt="..." />
        <a>
          <div
            className="mask"
            style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
          ></div>
        </a>
      </MDBRipple>
      <MDBCardBody>
        <MDBCardTitle className="text-dark mb-4">{title}</MDBCardTitle>
        <div className="d-flex justify-content-between mb-3">
          <h5 className="text-dark mb-2">{desc}</h5>
          <h5 className="text-dark mb-3">${price}</h5>
        </div>
        <MDBBtn onClick={handleAddToCart}>Add to Cart</MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
}
