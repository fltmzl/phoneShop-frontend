import { api } from "config/axios";
import { InferGetServerSidePropsType } from "next";
import React from "react";
import { Transaction } from "typings/api";
import { formatToRupiah, isoToReadable } from "utils";

const Invoice = ({ transaction }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const getName = () => {
    return `${transaction.orderDetails.customer_details.first_name} ${transaction.orderDetails.customer_details.last_name}`;
  };

  return (
    <div className="max-w-3xl mx-auto border border-black p-5 m-5">
      <div className="text-right py-10">
        <p className="text-3xl font-bold">Invoice</p>
        <p className="">{transaction.orderDetails.transaction_details.order_id}</p>
      </div>
      <table className="table-fixed w-full">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="w-6/12 uppercase p-3">Diterbitkan Oleh</th>
            <th className="w-3/12 uppercase p-3 text-right">Untuk</th>
            <th className="w-3/12 uppercase p-3 text-right"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="pt-3">
              <span className="text-grey">Penjual:</span> TokoKita
            </td>
            <td className="pt-3 text-grey text-right pr-2">Pembeli: </td>
            <td className="pt-3 text-left">{getName()}</td>
          </tr>
          <tr>
            <td></td>
            <td className="text-grey text-right pr-2">Tanggal Pembelian: </td>
            <td className="text-left">{isoToReadable(transaction.createdAt)}</td>
          </tr>
          <tr>
            <td></td>
            <td className="text-grey text-right pr-2">Alamat Pengiriman: </td>
            <td className="text-left">{transaction.orderDetails.customer_details.shipping_address.address}</td>
          </tr>
        </tbody>
      </table>
      <table className="table-fixed w-full text-right my-4">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="w-3/12 uppercase p-3">Info Product</th>
            <th className="w-3/12 uppercase p-3 text-right">Quantity</th>
            <th className="w-3/12 uppercase p-3 text-right">Harga Satuan</th>
            <th className="w-3/12 uppercase p-3 text-right">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {transaction.orderDetails.item_details.map((item, index) => (
            <tr key={index}>
              <td className="py-2">{item.name}</td>
              <td className="py-2">{item.quantity}</td>
              <td className="py-2">{formatToRupiah(item.price)}</td>
              <td className="py-2">{formatToRupiah(item.price * item.quantity)}</td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td></td>
            <td className="py-6 font-bold text-lg">Total Harga Barang</td>
            <td className="py-6 font-bold text-lg">{formatToRupiah(transaction.orderDetails.transaction_details.gross_amount)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Invoice;

type Data = Transaction;

export const getServerSideProps = async (ctx: any) => {
  const id = ctx.params.id;

  const res = await api.get(`/transaction/${id}`);
  const transaction: Data = res.data[0];

  return {
    props: {
      transaction,
    },
  };
};
