import { useState } from "react";

export default function ProductList({ products, addToCart }) {
    return (
        <div className="product-container">
            {products.map((product) => {
                const [imgError, setImgError] = useState(false);

                return (
                    <div key={product.id} className="product">
                        <img
                            src={imgError ? "/fallback.jpg" : product.image}
                            alt={product.name}
                            className="product-image"
                            onError={(e) => {
                                // Try setting fallback image only if it exists
                                fetch("/fallback.jpg")
                                    .then((res) => {
                                        if (res.ok) {
                                            setImgError(true);
                                        } else {
                                            e.target.style.display = "none"; // Hide image if no fallback exists
                                        }
                                    })
                                    .catch(() => e.target.style.display = "none"); // Hide if fetch fails
                            }}
                        />
                        <h3>{product.name}</h3>
                        <p>₹{product.price.toFixed(2)}</p>
                        <button onClick={() => addToCart(product)} className="add-to-cart">
                            Add to Cart
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
