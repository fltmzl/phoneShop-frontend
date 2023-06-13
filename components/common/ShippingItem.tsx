import Image from "next/image";
import { Cart } from "typings/api";
import { formatToRupiah } from "utils";

interface Props {
  cart: Cart;
}

const ShippingItem = ({ cart }: Props) => {
  return (
    <div key={cart._id} className="flex gap-3">
      <div>
        <Image src={cart.product.images} alt={`${cart.product.model} image`} width={60} height={90} className="object-contain" />
      </div>
      <div>
        <div className="text-lg font-bold">{cart.product.model}</div>
        <div className="text-sm text-slate-600">
          Quantity: <span>{cart.quantity} Barang</span>
        </div>
        <div className="mt-2">
          Subtotal: <span className="font-semibold">{formatToRupiah(cart.quantity * cart.price)}</span>
        </div>
      </div>
    </div>
  );
};

export default ShippingItem;
