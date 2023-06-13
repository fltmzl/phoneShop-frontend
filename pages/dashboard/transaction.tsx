import withAuth from "hoc/withAuth";
import useTransaction from "hooks/useTransaction";
import Head from "next/head";
import { ProductColumn } from "pages/transaction";
import { formatToRupiah, isoToReadable } from "utils";
import { Sidebar } from ".";

const Transactions = () => {
  const { transactions, loading } = useTransaction();

  return (
    <>
      <Head>
        <title>Dashboard | TokoKita</title>
        <meta name="description" content="Website e-commerce yang menjual berbagai macam merk smartphone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex h-full">
        <Sidebar />
        <main className="flex-1 overflow-y-scroll h-full px-10">
          <div>
            <h1 className="text-3xl font-bold my-10">Transactions Data</h1>
          </div>
          <div>
            {loading ? (
              <p>Loading</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="table-fixed w-full font-light text-center">
                  <thead className="bg-slate-800 text-white rounded-xl">
                    <tr>
                      <th className="text-sm w-1/12 py-4">#</th>
                      <th className="text-sm w-3/12 py-4">Order-ID</th>
                      <th className="text-sm w-3/12 py-4">Products</th>
                      <th className="text-sm w-2/12 py-4">Total Price</th>
                      <th className="text-sm w-3/12 py-4">Status</th>
                      <th className="text-sm w-3/12 py-4">Updated At</th>
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
          </div>
        </main>
      </div>
    </>
  );
};

export default withAuth(Transactions);
