import React from "react";
import { Cart, CartItem } from "./types/Cart";
import { WhistList, WhistListItem } from "./types/WhistList";

type AppState = {
  mode: string;
  cart: Cart;
  whistlist: WhistList
};
// initiaState
const initialState: AppState = {
  mode: localStorage.getItem("mode")
    ? localStorage.getItem("mode")!
    : window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light",
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems")!)
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress")!)
      : {},
    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")!
      : "PayPal",
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
  whistlist: {
    WhistListItems : localStorage.getItem("WhistListItems")
    ? JSON.parse(localStorage.getItem("WhistListItems")!)
    : [],
  }
};

type Action =
  | { type: "SWITCH_MODE" }
  | { type: "CART_ADD_ITEM"; payload: CartItem }
  | { type: "WhistList_ADD_ITEM"; payload: WhistListItem }
  | { type: 'CART_REMOVE_ITEM'; payload: CartItem }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SWITCH_MODE":
      // vì AppState có mode và cart nên nó sẽ báo lỗi nếu return chỉ có mode nên phải rest state để có cart là dữ liệu trước đó
      return { ...state, mode: state.mode === "dark" ? "light" : "dark" };
    case "CART_ADD_ITEM":
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item: CartItem) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item: CartItem) =>
        // nnlt sẽ tự hiểu là khi có thêm new item thì quantity tự tăng
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };
      case 'CART_REMOVE_ITEM': {
        // trả về những item không trùng với item đã xóa
        const cartItems = state.cart.cartItems.filter(
          (item: CartItem) => item._id !== action.payload._id
        )
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
        return { ...state, cart: { ...state.cart, cartItems } }
      }
      case "WhistList_ADD_ITEM":
        const likeItem = action.payload;
        const existWhist = state.whistlist.WhistListItems.find(
          (item: WhistListItem) => item._id === likeItem._id
        );
        const WhistListItems = existWhist
          ? state.whistlist.WhistListItems.map((item: WhistListItem) =>
          // nnlt sẽ tự hiểu là khi có thêm new item thì quantity tự tăng
              item._id === existWhist._id ? likeItem : item
            )
          : [...state.whistlist.WhistListItems, likeItem];
  
        localStorage.setItem("WhistListItems", JSON.stringify(WhistListItems));
  
        return { ...state, whistlist: { ...state.whistlist, WhistListItems } };
    default:
      return state;
  }
}

const defaultDispatch: React.Dispatch<Action> = () => initialState;

const Store = React.createContext({
  state: initialState,
  dispatch: defaultDispatch,
});

function StoreProvider(props: React.PropsWithChildren<{}>) {
  const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
    reducer,
    initialState
  );

  return <Store.Provider value={{ state, dispatch }} {...props} />;
}

export { Store, StoreProvider };
