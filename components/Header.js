import { useRef } from "react";

export default function Header({ cart = [], setIsCartOpen }) {
    // Function to scroll to a specific section
    const scrollToSection = (id, event) => {
        event.preventDefault(); // Prevent default anchor behavior
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <header className="header">
            <h1 className="logo">🌿 ChandanaVana Nursery</h1>
            <nav className="nav-links">
                <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                    Home
                </a>
                <a href="#" onClick={(e) => scrollToSection("product-section", e)}>
                    Shop
                </a>
                <a href="#" onClick={(e) => scrollToSection("footer-section", e)}>
                    Contact
                </a>
                <button className="cart-button" onClick={() => setIsCartOpen(true)}>
                    🛒 Cart ({cart?.reduce((acc, product) => acc + product.quantity, 0) || 0})
                </button>
            </nav>
        </header>
    );
}
