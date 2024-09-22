import { useSelector } from "react-redux";

// this custom hooks recieves the products id from the cart and then count each item's quantity and returns the object
const useCountOfItemsInCart = () => {
  const cart = useSelector((store) => store.product.cart);

  const countCartItems = cart.reduce((acc, value) => {
    if (acc[value]) {
      acc[value] = acc[value] + 1;
    } else {
      acc[value] = 1;
    }
    return acc;
  }, {});

  return countCartItems;
};

export default useCountOfItemsInCart;
