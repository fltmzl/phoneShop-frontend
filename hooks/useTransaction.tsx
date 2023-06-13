import { api } from "config/axios";
import { useState, useEffect, useCallback } from "react";
import { Transaction } from "typings/api";
import useAuth from "./useAuth";

const useTransaction = () => {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const getTransaction = useCallback(async () => {
    try {
      const res = await api.get("/transaction", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      setTransactions(res.data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    getTransaction();
  }, [getTransaction]);

  return {
    transactions,
    loading,
    error,
  };
};

export default useTransaction;
