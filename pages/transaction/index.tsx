import Header from "@/components/part/Header";
import Promo from "@/components/part/Promo";
import Head from "next/head";
import withAuth from "hoc/withAuth";
import useTransaction from "hooks/useTransaction";
import { Transaction } from "typings/api";
import { v4 as uuidv4 } from "uuid";
import { isoToReadable, formatToRupiah } from "utils";

export const ProductColumn = ({ transaction }: { transaction: Transaction }) => {
  return (
    <>
      {transaction.orderDetails.item_details.map((item) => (
        <ul key={transaction._id + uuidv4()}>
          <li>{item.name}</li>
        </ul>
      ))}
    </>
  );
};

const Transaction = () => {
  const { transactions, loading } = useTransaction();

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
        <section className="container py-16">
          <div>
            <h1 className="text-3xl font-bold">Transaction</h1>
          </div>
          {loading ? (
            <p>Loading</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-fixed w-full font-light text-center">
                <thead className="bg-slate-800 text-white rounded-xl">
                  <tr>
                    <th className="w-1/12 py-4">#</th>
                    <th className="w-2/12 py-4">Order-ID</th>
                    <th className="w-4/12 py-4">Products</th>
                    <th className="w-2/12 py-4">Total Price</th>
                    <th className="w-1/12 py-4">Status</th>
                    <th className="w-2/12 py-4">Updated</th>
                  </tr>
                </thead>
                <tbody className="font-extralight">
                  {transactions.map((transaction, index) => {
                    let statusClassName = "";
                    if (transaction.details.transaction_status === "pending") statusClassName = "bg-yellow-300";
                    if (transaction.details.transaction_status === "settlement") statusClassName = "bg-green-300";

                    return (
                      <tr key={transaction._id} className={index % 2 === 0 ? "bg-slate-200" : ""}>
                        <td className="font-normal p-4 overflow-hidden text-sm">{index + 1}</td>
                        <td className="font-normal p-4 overflow-hidden text-ellipsis text-sm">{transaction.orderDetails.transaction_details.order_id}</td>
                        <td className="font-normal p-4 overflow-hidden text-sm">
                          <ProductColumn transaction={transaction} />
                        </td>
                        <td className="font-normal p-4 overflow-hidden text-sm">{formatToRupiah(transaction.orderDetails.transaction_details.gross_amount)}</td>
                        <td className={`font-normal p-4 overflow-hidden text-sm capitalize`}>
                          <span className={`rounded-xl p-2 ${statusClassName}`}>{transaction.details.transaction_status === "settlement" ? "success" : transaction.details.transaction_status}</span>
                        </td>
                        <td className="font-normal p-4 overflow-hidden text-sm">{isoToReadable(transaction.updatedAt)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default withAuth(Transaction);
