import Image from "next/image";
import iphone from "@/public/images/iphone.jpg";

const CardBrand = ({ image = iphone, brand = "SAMSUNG" }) => {
  return (
    <div className="rounded-lg bg-gradient-to-br from-purple-600 to-purple-300 h-60 w-full max-w-[150px]">
      <div className="text-center font-bold text-white py-3">{brand}</div>
      <div className="relative h-full">
        <Image src={image} alt="iphone" width={500} height={750} className="absolute bottom-16 -right-10 mix-blend-darken" />
      </div>
    </div>
  );
};

export default CardBrand;
