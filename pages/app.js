import { useState, useEffect } from "react";

export default function App() {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Close cart when refreshing the page
    useEffect(() => {
        setIsCartOpen(false);
    }, []);

    return (
        <div>
            <header>
                <h1>Plant Shop</h1>
                <button onClick={() => setIsCartOpen(true)}>🛒 Cart</button>
            </header>

            {isCartOpen && <Cart cart={cart} setCart={setCart} onClose={() => setIsCartOpen(false)} />}
        </div>
    );
}
