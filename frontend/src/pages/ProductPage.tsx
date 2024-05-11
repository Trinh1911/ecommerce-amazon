import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductDetailsBySlugQuery } from "../Hooks/productHooks";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { convertProductToCartItem, getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import Rating from "../components/Rating";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Store } from "../Store";
import BreadcrumbComponent from "../components/BreadcrumbComponent";

const ProductPage = () => {
  const [addquantity, setQuantity] = useState(0);
  const params = useParams();
  const [active, setActive] = useState(1);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([
    "",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=480,h=480/app/assets/products/large_images/jpeg/1de15688-2340-4435-92dc-ef5c9d1bdf8a.jpg?ts=1707312314",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=480,h=480/app/images/products/sliding_image/159b.jpg?ts=1654778815",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=480,h=480/app/assets/products/large_images/jpeg/1de15688-2340-4435-92dc-ef5c9d1bdf8a.jpg?ts=1707312314",
  ]);
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
  const addToCartHandler = (addquantity: number) => {
    const existItem = cart.cartItems.find((x) => x._id === product!._id);
    const quantity = existItem ? existItem.quantity + addquantity : addquantity;
    console.log("quantity", quantity);
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
      setQuantity(addquantity + 1);
      console.log("quantity: ", addquantity);
    } else {
      setQuantity(addquantity - 1);
    }
  };
  useEffect(() => {
    if (product!.image) {
      setCurrentImage(product!.image);
      setImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[0] = product!.image;
        return updatedImages;
      });
    }
  }, [product]);
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
          <Col className="col-md-5 col-xl-6">
            {currentImage && (
              <img
                className="rounded-lg object-fit"
                src={currentImage}
                width="480px"
              />
            )}
            {images[0] !== "" && (
              <div className="row d-flex items-center justify-center mt-2 px-3">
                {images.map((image, index) => (
                  <div className="col-md-3" key={index}>
                    <img
                      // onMouseOver={() => setCurrentImage(image)}
                      onClick={() => setCurrentImage(image)}
                      width="130px"
                      style={{
                        border:
                          currentImage === image
                            ? "1px solid rgb(12, 131, 31)"
                            : "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                      src={image}
                    />
                  </div>
                ))}
              </div>
            )}
          </Col>
          <Col className="col-md-7 col-xl-6">
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
              <div
                style={{
                  width: "100px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div className="product-detail--price">${product.price}</div>
                <div style={{ marginTop: "5px", marginLeft: "10px" }}>
                  {product.countInStock > 0 ? (
                    <Badge bg="success">In Stock</Badge>
                  ) : (
                    <Badge bg="danger">Unavailable</Badge>
                  )}
                </div>
              </div>
              <div className="line"></div>
            </ListGroup>
            <div className="mt-4 d-flex align-items-center">
              <Button
                className="button-quantity button-left "
                onClick={() => hanleChangeCount("decrease")}
                disabled={addquantity === 0}
              >
                -
              </Button>
              <input
                className="input-quantity"
                min={1}
                value={addquantity}
                max={product.countInStock}
                onChange={onchange}
              />
              <Button
                className="button-quantity button-right"
                onClick={() => hanleChangeCount("increase")}
                disabled={addquantity === product.countInStock}
              >
                +
              </Button>
            </div>
            <div className="mt-2 d-flex align-items-center mb-4">
              {product.countInStock > 0 && (
                <Button
                  className="button-add add-M mt-2"
                  onClick={() => addToCartHandler(addquantity)}
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
        </Row>
        <Row>
          <Col className="col-12">
            <div className="d-flex justify-content-evenly align-items-center pb-0">
              <div className="title-description" onClick={() => setActive(1)}>
                Description
              </div>
              <div className="title-description" onClick={() => setActive(2)}>
                Feedback
              </div>
            </div>
            <div className="line"></div>
            {active === 1 ? (
              <table className="table-description">
                <tbody>
                  <tr style={{ backgroundColor: "#f0f3f2" }}>
                    <th>Key Features</th>
                    <td>{product.category}</td>
                  </tr>
                  <tr>
                    <th>Country Of Origin</th>
                    <td>{product.rating}</td>
                  </tr>
                  <tr style={{ backgroundColor: "#f0f3f2" }}>
                    <th>Return Policy</th>
                    <td>{product.numReviews}</td>
                  </tr>
                  <tr>
                    <th>Disclaimer</th>
                    <td>{product.countInStock}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <div>feedback</div>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProductPage;
