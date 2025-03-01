import { useState, useEffect } from "react";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Close cart on refresh
  useEffect(() => {
    setIsCartOpen(false);
  }, []);

  return (
    <Component
      {...pageProps}
      cart={cart}
      setCart={setCart}
      isCartOpen={isCartOpen}
      setIsCartOpen={setIsCartOpen}
    />
  );
}
