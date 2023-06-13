import useCart from "hooks/useCart";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { Cart } from "typings/api";
import { formatToRupiah } from "utils";
import Counter from "./Counter";

interface Props {
  cart: Cart;
}

const LoadingImage = () => {
  return <div className="w-[40px] h-[65px] bg-slate-200 animate-pulse rounded-xl"></div>;
};

const CartItem = ({ cart }: Props) => {
  const { incQuantity, decQuantity, deleteProductFromCart, loading } = useCart();

  return (
    <tr key={cart._id}>
      <td className="flex-y-center gap-4">
        {loading ? <LoadingImage /> : <Image src={cart.product.images} alt={`${cart.product.model} image`} width={50} height={80} className="object-contain" />}
        <span className="block">{cart.product.model}</span>
      </td>
      <td>
        <Counter counter={cart.quantity} handleDecrease={() => decQuantity(cart._id)} handleIncrease={() => incQuantity(cart._id)} />
      </td>
      <td>{formatToRupiah(cart.product.price * cart.quantity)}</td>
      <td>
        <button className="p-2 rounded-full hover-pri cursor-pointer" onClick={() => deleteProductFromCart(cart._id)}>
          <MdDelete />
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
