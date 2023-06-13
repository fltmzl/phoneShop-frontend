import type { NextApiRequest, NextApiResponse } from "next";
import midtransClient from "midtrans-client";
import { v4 as uuidv4 } from "uuid";
import { ObjectId } from "mongodb";
import { api } from "config/axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      const authorization = req.headers?.authorization;

      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      const orderId = new ObjectId().toString();

      let parameter = {
        ...req.body,
        transaction_details: {
          ...req.body.transaction_details,
          order_id: orderId,
        },
      };

      console.log({ parameter });
      let transaction = null;

      try {
        transaction = await snap.createTransaction(parameter);
        console.log({ transaction });
      } catch (err: any) {
        return res.status(401).json({ error: err, message: err.message });
      }

      try {
        console.log("tesss", transaction);
        const response = await api.post("/transaction", {
          orderDetails: parameter,
          token: transaction.token,
          details: {
            transaction_status: "pending",
          },
        });
        console.log({ response });

        return res.status(200).json(transaction);
      } catch (err: any) {
        return res.status(401).json({ error: err, message: err.message });
      }
    default:
      return res.status(400).json({ message: "Method not available" });
  }
}

// try {
//   const res = await api.post("/transaction", {
//orderDetails: {
//   ...parameter
//    },
//  token: snapToken
//  }, {
//     headers: {
//       Authorization: authorization,
//     },
//   });
// } catch (error: any) {
//   return res.status(401).json(error.response.data);
// }
