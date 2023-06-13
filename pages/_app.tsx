import "@/styles/globals.css";
import { AuthProvider } from "context/AuthContext";
import { CartProvider } from "context/CartContext";
import type { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <AuthProvider>
        <CartProvider>
          <NextNProgress />
          <Component {...pageProps} />
        </CartProvider>
      </AuthProvider>
    </CookiesProvider>
  );
}
