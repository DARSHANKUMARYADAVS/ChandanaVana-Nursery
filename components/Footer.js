import { useState } from "react";

export default function Footer() {
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [successMessage, setSuccessMessage] = useState("");

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            alert("Please fill in all fields.");
            return;
        }

        setSuccessMessage("✅ Message Sent Successfully!");
        setTimeout(() => {
            setSuccessMessage("");
            setIsContactOpen(false);
        }, 3000);
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="shop-details">
                    <h3>🌿 ChandanaVana Nursery</h3>
                    <p>Bringing Nature Closer to You!</p>
                    <p><strong>Location:</strong> 123 Green Avenue, Bangalore, India</p>
                    <p><strong>Phone:</strong> +91 98765 43210</p>
                    <p><strong>Email:</strong> contact@chandanavana.com</p>
                </div>

                <div className="contact-section">
                    <h3>📩 Get in Touch</h3>
                    <button className="contact-button" onClick={() => setIsContactOpen(true)}>
                        Contact Us
                    </button>
                </div>
            </div>

            <p className="footer-text">© 2025 Plant Shop. All rights reserved.</p>

            {/* Contact Modal */}
            {isContactOpen && (
                <div className="contact-modal-overlay">
                    <div className="contact-modal">
                        {successMessage && <h3 className="success-message">{successMessage}</h3>}
                        <button className="close-modal" onClick={() => setIsContactOpen(false)}>✖</button>
                        {!successMessage ? (
                            <>
                                <h2>Contact Us</h2>
                                <form onSubmit={handleSubmit}>
                                    <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleInputChange} required />
                                    <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleInputChange} required />
                                    <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleInputChange} required />
                                    <button type="submit" className="send-message">Send Message</button>
                                </form>
                            </>
                        ) : null}
                    </div>
                </div>
            )}

            {/* Styles */}
            <style jsx>{`
                .footer {
                    background: #222;
                    color: white;
                    padding: 20px;
                    text-align: center;
                    margin-top: 20px;
                }
                .footer-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    max-width: 900px;
                    margin: 0 auto;
                    padding-bottom: 10px;
                }
                .shop-details {
                    text-align: left;
                }
                .contact-section {
                    text-align: right;
                }
                .contact-button {
                    background: #007bff;
                    color: white;
                    padding: 10px 15px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .contact-button:hover {
                    background: #0056b3;
                }
                .footer-text {
                    margin-top: 10px;
                    font-size: 14px;
                }
                .contact-modal-overlay {
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
                .contact-modal {
                    width: 400px;
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    text-align: center;
                    position: relative;
                }
                .close-modal {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: none;
                    border: none;
                    font-size: 20px;
                    cursor: pointer;
                }
                .contact-modal input, .contact-modal textarea {
                    width: 100%;
                    padding: 10px;
                    margin: 10px 0;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    font-size: 14px;
                }
                .send-message {
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
                .send-message:hover {
                    background: #218838;
                }
                .success-message {
                    font-size: 18px;
                    color: green;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
            `}</style>
        </footer>
    );
}
