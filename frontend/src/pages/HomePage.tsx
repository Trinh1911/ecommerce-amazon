import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Col, Row } from "react-bootstrap";
import ProductItem from "../components/ProductItem";
import { Helmet } from "react-helmet-async";
import { useGetProductsQuery } from "../Hooks/productHooks";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import Carousel from "react-bootstrap/Carousel";
import SlideProduct from "../components/SlideProduct";
import ProductCoutDown from "../components/ProductCoutDown";
import ButtonComponent from "../components/ButtonComponent";

const HomePage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const SnackProduct = products?.filter((product) => {
    return product.brand === "Snack";
  });
  // hideFooter();
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
        <Carousel data-bs-theme="dark">
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
              <ButtonComponent />
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
              <p>
                Free Shipping to First-Time Customers Only, After promotions and
                discounts are applied.
              </p>
              <ButtonComponent />
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      {/* introduce */}
      <Row>
        <div className="col-12 col-md-6 mb-3 mb-lg-0">
          <div>
            <div
              className="rounded introduce-img1"
              style={{
                background:
                  "url(../public/images/image/grocery-banner.png) center cover no-repeat",
              }}
            >
              <h3>Fruits & Vegetables</h3>
              <p>Get Upto</p>
              <ButtonComponent />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 mb-3 mb-lg-0">
          <div>
            <div
              className="rounded introduce-img2"
              style={{
                background:
                  "url(../public/images/image/grocery-banner-2.jpg) center cover no-repeat",
              }}
            >
              <h3>Fruits & Vegetables</h3>
              <p>Get Upto</p>
              <ButtonComponent />
            </div>
          </div>
        </div>
      </Row>
      {/* Popular Products */}
      <div className="container mx-80">
        <div className="mb-6 mb-24">
          <h3 className="mb-0">Popular Products</h3>
        </div>
        <div className="row g-4 row-cols-lg-5 row-cols-2 row-cols-md-3">
          {products!.map((product) => (
            <Col key={product.slug}>
              <ProductItem product={product} />
            </Col>
          ))}
        </div>
      </div>
      {/* Best Selling Products */}
      <div className="container mx-80">
        <div className="mb-6 mb-24">
          <h3 className="mb-0">Best Selling Products</h3>
        </div>
        <div className="row">
          <SlideProduct products={products} />
        </div>
      </div>
      {/* Daily Best Sells */}
      <div className="container mx-80">
        <div className="mb-6 mb-24">
          <h3 className="mb-0">Daily Best Sells</h3>
        </div>
        <div className="row g-4 row-cols-lg-4 row-cols-1 row-cols-md-2">
          <div>
            <div className="rounded banner-deal">
              <h3 className="fw-bold text-white fs-24">
                100% Organic Coffee Beans.
              </h3>
              <p className="text-white fw-500">
                Get the best deal before close.
              </p>
              <ButtonComponent
                style={{
                  backgroundColor: "#0aad0a",
                  borderColor: "#0aad0a",
                }}
              >
                <span>Shop Now</span>
                <i className="fas fa-arrow-right "></i>
              </ButtonComponent>
            </div>
          </div>
          {SnackProduct!.map((product) => (
            <Col key={product.slug}>
              <ProductCoutDown product={product} />
            </Col>
          ))}
        </div>
      </div>
      {/* Services */}
      <section className="my-lg-5 my-8">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-3 services">
              <div className="mb-xl-0">
                <div className="mb-4">
                  <img src="./images/icon/clock.svg" alt="clock" />
                </div>
                <h3>10 minute grocery now</h3>
                <p>
                  Get your order delivered to your doorstep at the earliest from
                  FreshCart pickup stores near you.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 services">
              <div className="mb-xl-0">
                <div className="mb-4">
                  <img src="./images/icon/gift.svg" alt="gift" />
                </div>
                <h3>Best Prices & Offers</h3>
                <p>
                  Cheaper prices than your local supermarket, great cashback
                  offers to top it off. Get best pricess & offers.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 services">
              <div className="mb-xl-0">
                <div className="mb-4">
                  <img src="./images/icon/package.svg" alt="package" />
                </div>
                <h3>Wide Assortment</h3>
                <p>
                  Choose from 5000+ products across food, personal care,
                  household, bakery, veg and non-veg & other categories.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 services">
              <div className="mb-xl-0">
                <div className="mb-4">
                  <img src="./images/icon/refresh-cw.svg" alt="refresh-cw" />
                </div>
                <h3>Easy Returns</h3>
                <p>
                  Not satisfied with a product? Return it at the doorstep & get
                  a refund within hours. No questions asked policy .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
