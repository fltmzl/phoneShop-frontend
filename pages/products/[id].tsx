import Counter from "@/components/common/Counter";
import Header from "@/components/part/Header";
import Promo from "@/components/part/Promo";
import { api } from "config/axios";
import { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Product } from "typings/api";
import { formatToRupiah } from "utils";
import { BiBattery, BiCalendar, BiCamera, BiChip } from "react-icons/bi";
import { FaMemory } from "react-icons/fa";
import { MdAndroid, MdStorage } from "react-icons/md";
import SpecCard from "@/components/card/SpecCard";

export default function ProductDetail({ product }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [counter, setCounter] = useState<number>(1);

  const handleDecrease = () => {
    setCounter((prev) => {
      if (prev === 1) return 1;
      return prev - 1;
    });
  };

  const handleIncrease = () => {
    setCounter((prev) => {
      return prev + 1;
    });
  };

  const addProductToCart = async () => {
    try {
      const res = await api.post("/cart", {
        user: "63c02022d5a1a4a6b6fe6d26",
        product: product._id,
        quantity: counter,
        price: product.price,
      });

      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>TokoKita</title>
        <meta name="description" content="Website e-commerce yang menjual berbagai macam merk smartphone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Promo />
      <main>
        <Header />
        <section className="container flex flex-col lg:flex-row">
          <div className="basis-5/12 relative min-h-[300px]">
            <Image src={product.images} alt={`${product.model} image`} fill className="object-contain" />
          </div>
          <div className="basis-full max-w-2xl space-y-8">
            <h1 className="text-3xl font-semibold">{product.model}</h1>
            <p>{product.description}</p>
            <div className="text-3xl font-bold">{formatToRupiah(product.price)}</div>
            <Counter counter={counter} handleIncrease={handleIncrease} handleDecrease={handleDecrease} />
            <div className="flex gap-4">
              <button className="button-pri w-full">Buy Now</button>
              <button className="button-sec w-full" onClick={addProductToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </section>

        <section className="container mt-16">
          <h2 className="text-2xl font-semibold mb-10">{product.model} Specifications</h2>
          <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <SpecCard icon={<BiChip />} title="Chipset" value={product.specs.chipset} />
            <SpecCard icon={<FaMemory />} title="RAM" value={product.specs.ram} />
            <SpecCard icon={<MdStorage />} title="Storage" value={product.specs.storage} />
            <SpecCard icon={<BiCamera />} title="Camera" value={product.specs.camera} />
            <SpecCard icon={<BiBattery />} title="Battery" value={product.specs.battery} />
            <SpecCard icon={<MdAndroid />} title="OS" value={product.specs.os} />
            <SpecCard icon={<BiCalendar />} title="Release" value={product.releaseDate} />
          </div>
        </section>
      </main>
    </>
  );
}

type Data = Product;

export const getServerSideProps = async (ctx: { params: { id: string } }) => {
  const id = ctx.params.id;
  const res = await api.get(`/product/${id}`);
  const product: Data = res.data;

  return {
    props: {
      product,
    },
  };
};
