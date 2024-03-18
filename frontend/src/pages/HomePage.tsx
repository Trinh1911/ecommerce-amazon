import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Button, Col, Row } from "react-bootstrap";
import ProductItem from "../components/ProductItem";
import { Helmet } from "react-helmet-async";
import { useGetProductsQuery } from "../Hooks/productHooks";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import Carousel from "react-bootstrap/Carousel";

const HomePage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">
      {getError(error as unknown as ApiError)}
    </MessageBox>
  ) : (
    <>
      <Helmet>
        <title>Amazon</title>
      </Helmet>
      {/* slider */}
      <div className="mt-8 slider">
        <Carousel data-bs-theme="dark" >
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="./images/image/slide-1.jpg"
              alt="First slide"
            />
            <Carousel.Caption className="carousel-content">
              <h5>Free Shipping on</h5>
              <p>
                Introduced a new model for online grocery shopping and
                convenient home delivery.
              </p>
              <Button>
                <span>Shop Now</span><i className="fas fa-arrow-right "></i>
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="./images/image/slider-2.jpg"
              alt="Second slide"
            />
            <Carousel.Caption className="carousel-content">
              <h5>SuperMarket For Fresh Grocery</h5>
              <p>Free Shipping to First-Time Customers Only, After promotions and discounts are applied.</p>
              <Button>
                <span>Shop Now</span><i className="fas fa-arrow-right "></i>
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <Row>
        {products!.map((product) => (
          <Col key={product.slug} sm={6} md={4} lg={3}>
            <ProductItem product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomePage;
