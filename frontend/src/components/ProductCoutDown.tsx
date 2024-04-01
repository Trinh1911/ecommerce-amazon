import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Product } from "../types/Product";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { useContext } from "react";
import { Store } from "../Store";
import { CartItem } from "../types/Cart";
import { convertProductToCartItem, convertProductToWhistList } from "../utils";
import { toast } from "react-toastify";
import { WhistListItem } from "../types/WhistList";
const ProductCoutDown = ({ product }: { product: Product }) => {
  const [partyTime, setPartyTime] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
    whistlist: { WhistListItems },
  } = state;

  const addToCartHandler = (item: CartItem) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
    toast.success("Product added to the cart");
  };
  const addToWhistList = (item: WhistListItem) => {
    const existWhist = WhistListItems.find((x: any) => x._id === product._id);
    const quantity = existWhist ? existWhist.quantity + 1 : 1;
    dispatch({
      type: "WhistList_ADD_ITEM",
      payload: { ...item, quantity },
    });
    toast.success("Product added to the whistList");
  };
  useEffect(() => {
    const target = new Date("4/28/2024 23:59:59");

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setHours(h);

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);

      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        setPartyTime(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      {product.brand === "Snack" && (
        <Card className="card-product" style={{ height: "470px" }}>
          <Link to={`/product/${product.slug}`} style={{ textAlign: "center" }}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "220px" }}
              className="card-img-top"
            />
          </Link>
          <Card.Body>
            <Link
              to={`/product/${product.slug}`}
              style={{ textDecoration: "none" }}
            >
              <Card.Title style={{ fontSize: "17px", color: "#21313c" }}>
                {product.name}
              </Card.Title>
            </Link>
            <div className="tools-react-L">
              <i className="fas fa-eye "></i>
              <i className="fas fa-heart "></i>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <Card.Text className="m-0 price" style={{ fontSize: "14px" }}>
                ${product.price}
              </Card.Text>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </div>
            {product.countInStock === 0 ? (
              <Button variant="light" disabled>
                Out of stock
              </Button>
            ) : (
              <Button
                className="button-add add-L mt-2"
                onClick={() =>
                  addToCartHandler(convertProductToCartItem(product))
                }
              >
                <i className="fas fa-plus"></i>
                <span style={{marginLeft: "4px"}}>Add to cart</span>
              </Button>
            )}
            <div className="mt-3">
              <div className="d-flex justify-content-between">
                <div className="timer-segment">
                  <span>{days}</span>
                  <span>Days</span>
                </div>
                <div className="timer-segment">
                  <span>{hours}</span>
                  <span>Hours</span>
                </div>
                <div className="timer-segment">
                  <span>{minutes}</span>
                  <span>Minutes</span>
                </div>
                <div className="timer-segment">
                  <span>{seconds}</span>
                  <span>Seconds</span>
                </div>
              </div>
            </div>
            {/* <Button
            onClick={() => addToWhistList(convertProductToWhistList(product))}
          >
            Add to WhistList
          </Button> */}
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default ProductCoutDown;
