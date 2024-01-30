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

const ProductItem = ({ product }: { product: Product }) => {
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
  console.log("WhistListItems", WhistListItems);
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} className="card-img-top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button
            onClick={() => addToCartHandler(convertProductToCartItem(product))}
          >
            Add to cart
          </Button>
        )}
        <Button
          onClick={() => addToWhistList(convertProductToWhistList(product))}
        >
          Add to WhistList
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
