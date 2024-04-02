import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductDetailsBySlugQuery } from "../Hooks/productHooks";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { convertProductToCartItem, getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import Rating from "../components/Rating";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Store } from "../Store";
import BreadcrumbComponent from "../components/BreadcrumbComponent";

const ProductPage = () => {
  const [quantity, setQuantity] = useState(0);
  const params = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const { slug } = params;
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsBySlugQuery(slug!);
  console.log("product", product);
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const navigate = useNavigate();
  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (!value) {
      setQuantity(undefined);
      return;
    }

    setQuantity(parseFloat(value));
  };
  // const images = [
  //   {
  //     url: "../../images/p2.jpg",
  //   },
  //   {
  //     url: "../../images/p1.jpg",
  //   },
  // ];
  const addToCartHandler = () => {
    const existItem = cart.cartItems.find((x) => x._id === product!._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product!.countInStock < quantity) {
      toast.warn("Sorry. Product is out of stock");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...convertProductToCartItem(product!), quantity },
    });
    toast.success("Product added to the cart");
    navigate("/cart");
  };
  const hanleChangeCount = (type: string) => {
    if (type === "increase") {
      setQuantity(quantity + 1);
      console.log("quantity: ", quantity);
    } else {
      setQuantity(quantity - 1);
    }
  };
  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">
      {getError(error as unknown as ApiError)}
    </MessageBox>
  ) : !product ? (
    <MessageBox variant="danger">Page Not Found</MessageBox>
  ) : (
    <>
      <BreadcrumbComponent brand={product.brand} name={product.name} />
      <div>
        <Row>
          <Col className="col-md-6 col-xl-5">
            <img
              className="img-detail"
              src={product.image}
              alt={product.name}
            ></img>
            {/* <div>
              <img src={images[currentImage].url} className="main-image" />

              <div className="thumbnails">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    className={index === currentImage ? "active" : ""}
                    onClick={() => setCurrentImage(index)}
                  />
                ))}
              </div>
            </div> */}
          </Col>
          <Col className="col-md-6 col-xl-7">
            <ListGroup variant="flush">
              <div className="product-detail--brand">{product.brand}</div>
              <div>
                <Helmet>
                  <title>{product.name}</title>
                </Helmet>
                <h1>{product.name}</h1>
              </div>
              <div className="mb-4">
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                  styleNumReview={{
                    color: "#0aad0a",
                    fontSize: "16px",
                    marginLeft: "-16px",
                  }}
                  styleRating={{ visibility: "hidden" }}
                ></Rating>
              </div>
              <div className="product-detail--price">${product.price}</div>
              <div className="line"></div>
            </ListGroup>
            <div className="mt-4 d-flex align-items-center">
              <Button
                className="button-quantity button-left "
                onClick={() => hanleChangeCount("decrease")}
                disabled={quantity === 0}
              >
                -
              </Button>
              <input
                className="input-quantity"
                min={1}
                value={quantity}
                max={product.countInStock}
                onChange={onchange}
              />
              <Button
                className="button-quantity button-right"
                onClick={() => hanleChangeCount("increase")}
                disabled={quantity === product.countInStock}
              >
                +
              </Button>
            </div>
            <div className="mt-2 d-flex align-items-center mb-4">
              {product.countInStock > 0 && (
                <Button
                  className="button-add add-M mt-2"
                  onClick={() => addToCartHandler()}
                >
                  <i className="fas fa-folder-open"></i>
                  <span style={{ marginLeft: "8px" }}>Add to cart</span>
                </Button>
              )}
              <Button
                className="button-quantity"
                style={{
                  height: "40px",
                  marginTop: "8px",
                  borderRadius: "8px",
                  marginLeft: "8px",
                  backgroundColor: "#f0f3f2",
                }}
              >
                <img src="../../svg/heart.svg" alt="heart" />
              </Button>
            </div>
            <div className="line"></div>
            <div className="mt-4">
              <div
                style={{
                  borderBottom: "1px solid #21313c",
                  padding: "0 4px 2px 0",
                  width: "fit-content",
                }}
              >
                Country Of Origin: <span>India</span>
              </div>
              <p className="pt-2">
                Amul Taaza Toned Milk (Polypack) is pasteurized with a great
                nutritional value. It can be consumed directly or can be used
                for preparing tea, coffee, sweets, khoya, curd, buttermilk, ghee
                etc.
              </p>
            </div>
          </Col>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <Button
                    className="button-add add-M mt-2"
                    onClick={() => addToCartHandler()}
                  >
                    <i className="fas fa-plus"></i>
                    <span>Add to cart</span>
                  </Button>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Row>
      </div>
    </>
  );
};

export default ProductPage;
