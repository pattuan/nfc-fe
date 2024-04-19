import { Col, Container, Row } from "react-bootstrap";
import ProductCard from "../../component/productCard";
// import CardList from "../../page/order";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useState,useEffect } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/01.jpg"
import logo1 from "../../assets/images/02.jpg"
import logo2 from "../../assets/images/03.jpg"
import logo3 from "../../assets/images/04.png"
import logo4 from "../../assets/images/05.png"
import logo5 from "../../assets/images/06.jpg"
import logo6 from "../../assets/images/07.jpg"
var group = [
  {
    
    title: "PHÔI THẺ TRẮNG",
    data: [
      {
        id: "26t01n01pat09t09n99ltmh0001",
        title: "PHÔI THẺ TRẮNG",
        desc: "PTT0101",
        price: "20",
        image: logo,
        // image:"https://tanphat.com.vn/media/product/238_a583a0e586c9925e012ba8b3aa0c2d46.jpg",
          
      },
      {
        id: "26t01n01pat09t09n99ltmh0002",
        title: "THẺ TRẮNG CHIP PROXIMITY",
        desc: "PTT0102",
        price: "20",
        image: logo1,
      },
      
    ],
  },
  {
    title: "THẺ BÃO LÃNH",
    data: [
      {
        id: "26t01n01pat09t09n99ltmh0003",
        title: "THẺ BÃO LÃNH BSH",
        desc: "PPT0201",
        price: "20",
        image: logo2,
      },
    ],
  },
  {
    title: "THẺ BỆNH VIỆN",
    data: [
      {
        id: "26t01n01pat09t09n99ltmh0004",
        title: "THẺ BỆNH VIỆN ĐA KHOA NGHỆ AN",
        desc: "PPT0301",
        price: "20",
        image: logo3,
      },
      {
        id: "26t01n01pat09t09n99ltmh0005",
        title: "THẺ BỆNH VIỆN HẠNH PHÚC",
        desc: "PPT0301",
        price: "20",
        image: logo4,
      },
    ],
  },
  {
    title: "THẺ DÁN NFC",
    data: [
      {
        id: "26t01n01pat09t09n99ltmh0006",
        title: "THẺ DÁN NFC",
        desc: "PPT0401",
        price: "20",
        image: logo5,
      },
      
    ],
  },
  {
    title: "THẺ DANH THIẾP",
    data: [
      {
        id: "26t01n01pat09t09n99ltmh0007",
        title: "THẺ DANH THIẾP CÁ NHÂN",
        desc: "PPT0501",
        price: "20",
        image: logo6,
      },
      
    ],
  },
];

const Home = () => {

  const [cookies] = useCookies(["user"]);
  const navigate = useNavigate();
  
  useEffect(()=>{
    if (!cookies.token){
      navigate("/login");
      alert("Please Log In!");
    }
  })

  const [cart, setCart] = useState([]);
  console.log(cart);

  const addToCart = (data) => {
    // console.log("Adding to cart:", data);
    setCart([...cart, data])
  }

  return <>{group.map((item) => listCard(item.title, item.data, addToCart))}
  </>;
  
};

const listCard = (title, data = [], addToCart) => {
  var cols = [];

  data.forEach((item) => {
    cols.push(
      <MDBCol key={item.id} md="12" lg="4" className="mb-4 mb-lg-0">
        <ProductCard {...item} addToCart={addToCart} />
        {/* <CardList cart = {cart}/> */}
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
      <MDBRow>{cols} </MDBRow>
    </MDBContainer>
  );
};


export default Home;