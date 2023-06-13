import { CartContext } from "context/CartContext";
import { useContext } from "react";

const useCart = () => {
  const context = useContext(CartContext);

  return context;
};

export default useCart;
