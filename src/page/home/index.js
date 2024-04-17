import { Col, Container, Row } from "react-bootstrap";
import ProductCard from "../../component/productCard";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useEffect } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { redirect } from "react-router-dom";

var group = [
  {
    title: "NFC",
    data: [
      {
        id: "64cfb4b4e219ede48fa3dd85",
        title: "NFC",
        desc: "NFC",
        price: "$100",
        image:
          "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/1.webp",
      },
      {
        id: "64cfb4b4e219ede48fa3dd86",
        title: "NFC",
        desc: "NFC",
        price: "$100",
      },
      {
        id: "64cfb4b4e219ede48fa3dd87",
        title: "NFC",
        desc: "NFC",
        price: "$100",
      },
      {
        id: "64cfb4b4e219ede48fa3dd88",
        title: "NFC",
        desc: "NFC",
        price: "$100",
      },
      {
        id: "64cfb4b4e219ede48fa3dd89",
        title: "NFC",
        desc: "NFC",
        price: "$100",
      },
    ],
  },
  {
    title: "Card",
    data: [
      {
        id: "64cfb4b4e219ede48fa3dd33",
        title: "NFC",
        desc: "NFC",
        price: "$100",
      },
    ],
  },
];

const listCard = (title, data = []) => {
  var cols = [];

  data.forEach((item) => {
    cols.push(
      <MDBCol key={item.id} md="12" lg="4" className="mb-4 mb-lg-0">
        <ProductCard {...item} />
      </MDBCol>
    );
  });

  return (
    <MDBContainer
      className="my-5"
      key={title}
      style={{ backgroundColor: "#eee", padding: "20px" }}
    >
      <h2 className="text-center mb-5">{title}</h2>
      <MDBRow>{cols}</MDBRow>
    </MDBContainer>
  );
};

const Home = () => {

  const [cookies] = useCookies(["user"]);
  useEffect(()=>{
    if (!cookies.token){
      redirect("/login")
    }
  })

  return <>{group.map((item) => listCard(item.title, item.data))}</>;
};

export default Home;
