import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBProgress,
  MDBProgressBar,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useCart } from "react-use-cart";


export default function ReceiptCard({id, title, price ,image, quantity, updateQuantity, removeItem }) {

  const [quantityState, setQuantity] = React.useState(quantity);

  const decrement = () => {
    if (quantityState > 1) {
      var newQt = quantityState - 1
      setQuantity(newQt);

    }
  };

  const increment = () => {
    var newQt = quantityState + 1
    setQuantity(newQt);

  };

  useEffect(()=>{
   updateQuantity(id,quantityState)
  },[quantityState])


  return (
    <MDBCard className="shadow-0 border mb-4">
      <MDBCardBody>
        <MDBRow>
          <MDBCol md="2">
            <MDBCardImage src={image} fluid alt={title} />
          </MDBCol>
          <MDBCol
            md="2"
            className="text-center d-flex justify-content-center align-items-center"
          >
            
            <p className="text-muted mb-0">{title}</p>
          </MDBCol>
          <MDBCol
            md="2"
            className="text-center d-flex justify-content-center align-items-center"
          >
            <Button variant="outline-light" size="sm" className="text-muted mb-0" onClick={() => decrement()}>-</Button>
            <p className="text-muted mb-0 small">{quantityState}</p>
            <Button variant="outline-light" size="sm" className="text-muted mb-0" onClick={() => increment()}>+</Button>
          </MDBCol>
          <MDBCol
            md="2"
            className="text-center d-flex justify-content-center align-items-center"
          >
             
            <p className="text-muted mb-0 small">${price} </p>
          </MDBCol>

          <MDBCol
            md="2"
            className="text-center d-flex justify-content-center align-items-center"
          >
            <MDBBtn outline color="danger" size="sm" onClick={()=>removeItem(id)}>
              Remove
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  );
}
