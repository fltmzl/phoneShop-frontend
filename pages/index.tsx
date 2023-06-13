import Head from "next/head";
import CardBrand from "components/card/CardBrand";
import iphone from "@/public/images/iphone.png";
import samsung from "@/public/images/samsung.png";
import xiaomi from "@/public/images/xiaomi.png";
import vivo from "@/public/images/vivo.png";
import asus from "@/public/images/asus.png";
import ProductCard from "components/card/ProductCard";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { api } from "config/axios";
import Header from "@/components/part/Header";
import Promo from "@/components/part/Promo";
import { Product } from "typings/api";
import withAuth from "hoc/withAuth";

function Home({ products }: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
        <section className="container my-16">
          <div className="flex justify-between">
            <CardBrand image={samsung} brand="SAMSUNG" />
            <CardBrand image={asus} brand="ASUS" />
            <CardBrand image={iphone} brand="APPLE" />
            <CardBrand image={xiaomi} brand="XIAOMI" />
            <CardBrand image={vivo} brand="VIVO" />
          </div>
        </section>

        <section className="container my-16">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold mb-5">Recommended Smartphones</h2>
            <Link href={"#"} className="hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-7">
            {products
              .filter((product) => product.recommended)
              .map((product, index) => {
                if (index < 10) return <ProductCard data={product} key={product._id} />;
              })}
          </div>
        </section>

        <section className="container my-16">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold mb-5">Popular Smartphones</h2>
            <Link href={"#"} className="hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-7">
            {products.map((product, index) => {
              if (index < 10) return <ProductCard data={product} key={product._id} />;
            })}
          </div>
        </section>

        <section className="container">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold mb-5">New Smartphones</h2>
            <Link href={"#"} className="hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-7">
            {products
              .filter((product) => product.new)
              .map((product, index) => {
                if (index < 10) return <ProductCard data={product} key={product._id} />;
              })}
          </div>
        </section>
      </main>
    </>
  );
}

export default withAuth(Home);

type Data = [Product];

export const getServerSideProps = async () => {
  const res = await api.get("/product");
  const products: Data = res.data;

  return {
    props: {
      products,
    },
  };
};
