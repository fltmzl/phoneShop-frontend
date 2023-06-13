import Promo from "@/components/part/Promo";
import Head from "next/head";
import Header from "@/components/part/Header";
import useCart from "hooks/useCart";
import CartItem from "@/components/common/CartItem";
import withAuth from "hoc/withAuth";
import { calculateTotalOrder, formatToRupiah, totalQty } from "utils";
import Link from "next/link";
import { useEffect } from "react";

const Cart = () => {
  const { carts, getCartData } = useCart();

  useEffect(() => {
    getCartData();
  }, [getCartData]);

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
        <section className="container gap-10 py-16">
          <div className="w-full">
            <h1 className="text-3xl font-bold my-10">Shopping Cart</h1>
            <table className="w-full">
              <thead className="text-left">
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {carts.map((cart) => (
                  <CartItem key={cart._id} cart={cart} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-slate-900 text-white w-5/12 ml-auto p-5 mt-5 rounded-xl">
            <div>
              <h2 className="text-lg text-pri font-bold mb-4">Order summary</h2>
              <div>
                <div className="flex-y-center justify-between">
                  <div>
                    Total harga <span>{totalQty(carts)}</span>:
                  </div>
                  <div>{formatToRupiah(calculateTotalOrder(carts))}</div>
                </div>

                <div className="flex-y-center justify-between">
                  <div>Total Diskon:</div>
                  <div>0</div>
                </div>

                <div className="h-px bg-slate-600 my-3"></div>

                <div className="flex-y-center justify-between">
                  <div>Total Bayar:</div>
                  <div>{formatToRupiah(calculateTotalOrder(carts))}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-end mt-7">
            <Link href={"/cart/shipping"} className="button-pri">
              Buy <span>{totalQty(carts)}</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default withAuth(Cart);
