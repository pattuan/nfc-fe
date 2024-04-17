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
import React from "react";

export default function ReceiptCard(props) {
  return (
    <MDBCard className="shadow-0 border mb-4">
      <MDBCardBody>
        <MDBRow>
          <MDBCol md="2">
            <MDBCardImage src={props.image} fluid alt={props.name} />
          </MDBCol>
          <MDBCol
            md="2"
            className="text-center d-flex justify-content-center align-items-center"
          >
            <p className="text-muted mb-0">{props.name}</p>
          </MDBCol>
          <MDBCol
            md="2"
            className="text-center d-flex justify-content-center align-items-center"
          >
            <p className="text-muted mb-0 small">Qty: {props.quantity}</p>
          </MDBCol>
          <MDBCol
            md="2"
            className="text-center d-flex justify-content-center align-items-center"
          >
            <p className="text-muted mb-0 small">${props.price} đ</p>
          </MDBCol>

          <MDBCol
            md="2"
            className="text-center d-flex justify-content-center align-items-center"
          >
            <MDBBtn outline color="danger" size="sm">
              Remove
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  );
}
