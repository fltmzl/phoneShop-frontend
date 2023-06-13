import xiaomi from "@/public/images/xiaomi.png";
import useCart from "hooks/useCart";
import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";
import { BiChip } from "react-icons/bi";
import { FaMemory } from "react-icons/fa";
import { MdStorage } from "react-icons/md";
import { Product } from "typings/api";
import { formatToRupiah } from "utils";

interface SpecProps {
  icon: ReactElement;
  text: String;
}

const Spec = ({ icon = <BiChip />, text = "Text" }: SpecProps) => {
  return (
    <div className="flex-y-center gap-2 text-gray-500">
      {icon}
      <span className="line-clamp-1 text-sm">{text}</span>
    </div>
  );
};

interface ProductCardProps {
  data: Product;
}

const ProductCard = ({ data }: ProductCardProps) => {
  const { addProductToCart } = useCart();

  return (
    <div className="w-full">
      <Link href={`/products/${data._id}`}>
        <div className="flex-center rounded-lg bg-gray-200 p-5 aspect-[4/3] relative">
          <Image
            src={data.images}
            alt="product image"
            fill
            sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
            className="mix-blend-darken object-contain p-1"
          />
        </div>
      </Link>
      <div className="py-4">
        <Link href={`/products/${data._id}`}>
          <p className="font-semibold">{data.model}</p>
        </Link>
        <div className="my-3">
          <Spec icon={<BiChip />} text={data.specs.chipset} />
          <Spec icon={<FaMemory />} text={data.specs.ram} />
          <Spec icon={<MdStorage />} text={data.specs.storage} />
        </div>
        <span>{formatToRupiah(data.price)}</span>
      </div>
      <div>
        <button className="border border-gray-600 rounded-full py-2 px-4 hover-pri font-semibold hover:border-pri" onClick={() => addProductToCart(data._id, data.price)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
