import { useState } from "react";

export default function Cart({ cart = [], setCart, onClose }) {
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", phone: "", email: "", address: "" });
    const [orderSuccess, setOrderSuccess] = useState(false);

    const updateQuantity = (productId, change) => {
        setCart((prevCart) =>
            (prevCart || [])
                .map((item) =>
                    item.id === productId ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    const removeItem = (productId) => {
        setCart((prevCart) => (prevCart || []).filter(item => item.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const total = (cart || []).reduce((acc, product) => acc + product.price * product.quantity, 0);

    const handleCheckout = () => {
        setIsCheckoutOpen(true);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.phone || !formData.email || !formData.address) {
            alert("Please fill in all fields.");
            return;
        }
        setOrderSuccess(true);
        setCart([]); // Clear cart after successful order

        setTimeout(() => {
            setOrderSuccess(false);
            setIsCheckoutOpen(false);
            onClose(); // Close the cart modal after successful order
        }, 3000);
    };

    return (
        <div className="cart-modal-overlay">
            <div className="cart-modal">
                <button className="close-cart" onClick={onClose}>✖</button>
                <h2>🛒 Shopping Cart ({(cart || []).reduce((acc, product) => acc + product.quantity, 0)})</h2>

                {(cart || []).length === 0 ? (
                    <p className="empty-cart">Your cart is empty.</p>
                ) : (
                    <>
                        <p className="total">Total: <strong>₹{total.toFixed(2)}</strong></p>
                        <div className="cart-items">
                            {cart.map((product) => (
                                <div key={product.id} className="cart-item">
                                    <div className="cart-item-details">
                                        <p>{product.name}</p>
                                        <p className="price">₹{product.price.toFixed(2)} x {product.quantity}</p>
                                    </div>
                                    <div className="cart-buttons">
                                        <button onClick={() => updateQuantity(product.id, -1)} className="minus">-</button>
                                        <span className="quantity">{product.quantity}</span>
                                        <button onClick={() => updateQuantity(product.id, 1)} className="plus">+</button>
                                        <button onClick={() => removeItem(product.id)} className="remove">Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={clearCart} className="clear-cart">Clear Cart</button>
                        <button onClick={handleCheckout} className="checkout">Proceed to Checkout</button>
                    </>
                )}
            </div>

            {/* Checkout Modal */}
            {isCheckoutOpen && (
                <div className="checkout-modal-overlay">
                    <div className="checkout-modal">
                        {orderSuccess && <h3 className="success-message">🎉 Order Placed Successfully!</h3>}
                        <button className="close-checkout" onClick={() => setIsCheckoutOpen(false)}>✖</button>
                        {!orderSuccess ? (
                            <>
                                <h2>Checkout</h2>
                                <form onSubmit={handleSubmit}>
                                    <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} required />
                                    <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} required />
                                    <input type="email" name="email" placeholder="Email ID" value={formData.email} onChange={handleInputChange} required />
                                    <textarea name="address" placeholder="Delivery Address" value={formData.address} onChange={handleInputChange} required />
                                    <button type="submit" className="confirm-order">Confirm Order</button>
                                </form>
                            </>
                        ) : null}
                    </div>
                </div>
            )}

            {/* Styles */}
            <style jsx>{`
                .cart-modal {
                    width: 500px;
                    height: 600px;
                    background: white;
                    padding: 20px;
                    border-radius: 12px;
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 1000;
                    overflow-y: auto;
                }
                .cart-items {
                    max-height: 300px;
                    overflow-y: auto;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }
                .checkout {
                    background: #007bff;
                    color: white;
                    padding: 12px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    margin-top: 10px;
                    width: 100%;
                    font-size: 16px;
                }
                .checkout:hover {
                    background: #0056b3;
                }
                .checkout-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                .checkout-modal {
                    width: 450px;
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    text-align: center;
                    position: relative;
                }
                .close-checkout {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: none;
                    border: none;
                    font-size: 20px;
                    cursor: pointer;
                }
                .checkout-modal input, .checkout-modal textarea {
                    width: 100%;
                    padding: 10px;
                    margin: 10px 0;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    font-size: 14px;
                }
                .confirm-order {
                    background: #28a745;
                    color: white;
                    padding: 12px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    width: 100%;
                    margin-top: 10px;
                    font-size: 16px;
                }
                .confirm-order:hover {
                    background: #218838;
                }
                .success-message {
                    font-size: 18px;
                    color: green;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
            `}</style>
        </div>
    );
}
