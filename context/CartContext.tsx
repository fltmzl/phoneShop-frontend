import { api } from "config/axios";
import useAuth from "hooks/useAuth";
import { createContext, ReactNode, useEffect, useState, useCallback } from "react";
import { Cart } from "typings/api";
import { debounce } from "utils";

interface initialValueProps {
  carts: Cart[];
  loading: boolean;
  getCartData(): void;
  incQuantity(id: string): void;
  decQuantity(id: string): void;
  addProductToCart(productId: string, price: number): void;
  deleteProductFromCart(productId: string): void;
}

const initialValue = {
  carts: [],
  loading: false,
  getCartData: () => {},
  incQuantity: (id: string) => {},
  decQuantity: (id: string) => {},
  addProductToCart: (productId: string, price: number) => {},
  deleteProductFromCart: (productId: string) => {},
};

export const CartContext = createContext<initialValueProps>(initialValue);

interface CartContextProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartContextProps> = ({ children }) => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, token } = useAuth();

  const updateQuantity = useCallback(
    (carts: Cart[]) => {
      for (const cart of carts) {
        const body = {
          quantity: cart.quantity,
        };

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const res = api.patch(`/cart/${cart._id}`, body, config);
      }
    },
    [token]
  );

  const addProductToCart = useCallback(
    async (productId: string, price: number) => {
      const res = await api.post(
        "/cart",
        {
          product: productId,
          quantity: 1,
          price: price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCarts((prev) => {
        return [...prev, res.data];
      });
    },
    [token]
  );

  const deleteProductFromCart = useCallback(
    async (productId: string) => {
      const res = await api.delete(`/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCarts((prev) => {
        const filteredArray = prev.filter((item) => item._id !== productId);
        return filteredArray;
      });
    },
    [token]
  );

  const getCartData = useCallback(async () => {
    try {
      const res = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const carts = res.data;
      console.log("Carts", carts);

      setCarts(carts);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("CART FINALLY");
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (isLoggedIn && token) {
      console.log({ isLoggedIn, token });
      console.log("CART GETTT");
      getCartData();
    }
  }, [token, isLoggedIn, getCartData]);

  useEffect(() => {
    const debouncedUpdateQuantity = debounce(updateQuantity, 1500);

    debouncedUpdateQuantity(carts);
  }, [carts, updateQuantity]);

  const incQuantity = (id: string) => {
    const newCarts = carts.map((cart) => {
      if (cart._id === id) {
        return {
          ...cart,
          quantity: cart.quantity + 1,
        };
      }

      return cart;
    });

    setCarts(newCarts);
  };

  const decQuantity = (id: string) => {
    const newCarts = carts.map((cart) => {
      if (cart._id === id) {
        if (cart.quantity === 1) return cart; // jangan kurangi quantity jika sudah 1

        return {
          ...cart,
          quantity: cart.quantity - 1,
        };
      }

      return cart;
    });

    setCarts(newCarts);
  };

  const providerValue = {
    carts,
    loading,
    getCartData,
    incQuantity,
    decQuantity,
    addProductToCart,
    deleteProductFromCart,
  };

  return <CartContext.Provider value={providerValue}>{children}</CartContext.Provider>;
};
