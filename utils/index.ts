import { Cart } from "typings/api";

export function formatToRupiah(number: number) {
  let rupiah = "";
  let angkarev = number.toString().split("").reverse().join("");
  for (let i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
  return (
    "Rp " +
    rupiah
      .split("", rupiah.length - 1)
      .reverse()
      .join("")
  );
}

export const calculateTotalOrder = (carts: Cart[]) => {
  const total = carts.reduce((acc, curr) => {
    return acc + curr.quantity * curr.price;
  }, 0);

  return total;
};

export const totalQty = (carts: Cart[], numberOnly = false) => {
  const total = carts.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  if (numberOnly) return total;

  return `(${total} Barang)`;
};

export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
  let timeoutId: any;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

export const isoToReadable = (isoTime: string) => {
  const date = new Date(isoTime);

  return date.toLocaleString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};
