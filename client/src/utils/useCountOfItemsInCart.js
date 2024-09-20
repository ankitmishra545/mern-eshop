import { useSelector } from "react-redux";

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
