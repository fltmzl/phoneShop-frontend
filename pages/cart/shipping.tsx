import FormInput from "@/components/common/FormInput";
import ShippingItem from "@/components/common/ShippingItem";
import Header from "@/components/part/Header";
import Promo from "@/components/part/Promo";
import axios from "axios";
import withAuth from "hoc/withAuth";
import useAuth from "hooks/useAuth";
import useCart from "hooks/useCart";
import useInput from "hooks/useInput";
import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { calculateTotalOrder, formatToRupiah, totalQty } from "utils";

declare global {
  interface Window {
    snap: any;
  }
}

const Shipping = () => {
  const { carts } = useCart();
  const { userId, token } = useAuth();
  const [address, handleAddress] = useInput("");
  const [firstname, handleFirstname] = useInput("");
  const [lastname, handleLastname] = useInput("");
  const [phone, handlePhone] = useInput("");
  const [email, handleEmail] = useInput("");
  const [snapToken, setSnapToken] = useState("");

  const makePayment = async () => {
    const item_details = carts.map((cart) => {
      return {
        id: cart.product._id,
        price: cart.product.price,
        quantity: cart.quantity,
        name: cart.product.model,
      };
    });

    console.log({ item_details });

    const body = {
      transaction_details: {
        order_id: null,
        gross_amount: calculateTotalOrder(carts),
      },
      credit_card: {
        secure: true,
      },
      item_details,
      customer_details: {
        user_id: userId,
        first_name: firstname,
        last_name: lastname,
        email: email,
        phone: phone,
        billing_address: {
          first_name: firstname,
          last_name: lastname,
          email: email,
          phone: phone,
          address: address,
        },
        shipping_address: {
          first_name: firstname,
          last_name: lastname,
          email: email,
          phone: phone,
          address: address,
        },
      },
    };

    try {
      const res = await axios.post("/api/transaction", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log({ res });

      const snapTokenResult = res.data.token;
      setSnapToken(snapTokenResult);
      snapClick(snapTokenResult);
    } catch (err) {
      console.error(err);
    }
  };

  const snapClick = (snapToken: string) => {
    // Trigger snap popup. @TODO: Replace TRANSACTION_TOKEN_HERE with your transaction token
    window.snap.pay(snapToken, {
      onSuccess: function (result: any) {
        /* You may add your own implementation here */
        alert("payment success!");
        console.log(result);
      },
      onPending: function (result: any) {
        /* You may add your own implementation here */
        alert("wating your payment!");
        console.log(result);
      },
      onError: function (result: any) {
        /* You may add your own implementation here */
        alert("payment failed!");
        console.log(result);
      },
      onClose: function () {
        /* You may add your own implementation here */
        alert("you closed the popup without finishing the payment");
      },
    });
  };

  const onSubmitMakePayment = (e: any) => {
    e.preventDefault();
    makePayment();
  };

  return (
    <>
      <Head>
        <title>TokoKita</title>
        <meta name="description" content="Website e-commerce yang menjual berbagai macam merk smartphone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Script type="text/javascript" src="https://app.sandbox.midtrans.com/snap/snap.js" data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY} />
      <Promo />
      <main>
        <Header />

        <form className="container gap-10 py-16" onSubmit={onSubmitMakePayment}>
          <div className="w-full">
            <h1 className="text-3xl font-bold my-10">Shipping Information</h1>

            <div className="flex gap-10">
              <section className="flex-1 space-y-6">
                <FormInput type="text" label="Firstname" id="firstname" placeholder="John" value={firstname} onChange={handleFirstname} required={true} />
                <FormInput type="text" label="Lastname" id="lastname" placeholder="Doe" value={lastname} onChange={handleLastname} required={true} />
                <FormInput type="email" label="Email" id="email" placeholder="example@email.com" value={email} onChange={handleEmail} required={true} />
                <FormInput type="text" label="Address" id="address" placeholder="Jalan, Kelurahan, Kecamatan, Provinsi, Kode Pos" value={address} onChange={handleAddress} required={true} />
                <FormInput type="number" label="Phone Number" id="phone" placeholder="081266448787" value={phone} onChange={handlePhone} required={true} />
              </section>

              <div className="basis-5/12 space-y-5">
                {carts.map((cart) => (
                  <ShippingItem key={cart._id} cart={cart} />
                ))}
              </div>
            </div>
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

          <div className="w-full flex justify-between mt-7">
            <Link href={"/cart"} className="button-pri flex-y-center gap-4">
              <IoIosArrowBack />
              <span>Back</span>
            </Link>

            <button type="submit" id="pay-button" className="button-pri">
              Make Payment <span>{totalQty(carts)}</span>
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default withAuth(Shipping);
