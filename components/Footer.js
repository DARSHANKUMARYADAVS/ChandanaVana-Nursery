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
                    <p><strong>Location:</strong> Gunnur Village, Kailancha Ho, Ramnagar Taluk</p>
                    <p><strong>Phone:</strong> +91 9845040818</p>
                    <p><strong>Email:</strong> contact@chandanavana.com</p>
                    <a href="https://maps.app.goo.gl/C4tyEqkb8rZg4VpR6?g_st=aw" target="_blank" style={{ color: "blue" }}>Shop here 📍</a>
                </div>

                <div className="contact-section">
                    <h3>📩 Get in Touch</h3>
                    <button className="contact-button" onClick={() => setIsContactOpen(true)}>
                        Contact Us
                    </button>
                </div>
            </div>

            <hr className="footer-divider" />

            <div className="about-us">
                <h3>About Us</h3>
                <p>
                    Welcome to ChandanaVana Nursery, where nature thrives and beauty blossoms. We specialize in offering a wide selection of high-quality plants, ranging from vibrant flowers to lush shrubs and fruit trees. Our expert team is dedicated to helping you create beautiful, sustainable landscapes that will flourish for years to come.
                </p>
            </div>

            <div className="services">
                <h3>Our Services</h3>
                <ul>
                    <li><strong>Plant Sales:</strong> Wide variety of flowers, shrubs, trees, succulents, herbs, and vegetables.</li>
                    <li><strong>Landscaping Services:</strong> Designing outdoor spaces, planting, and maintenance.</li>
                    <li><strong>Tree Care:</strong> Pruning, trimming, and health checks for trees and shrubs.</li>
                    <li><strong>Soil & Fertilization:</strong> Soil testing, compost, and fertilization solutions.</li>
                    <li><strong>Pest Control:</strong> Eco-friendly pest and disease management for plants.</li>
                    <li><strong>Delivery Services:</strong> Home delivery of plants and garden supplies.</li>
                </ul>
            </div>

            <p className="footer-text">© 2025 Plant Shop. All rights reserved.</p>

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

            <style jsx>{`
                .footer {
                    background: #1a1a1a;
                    color: #ccc;
                    padding: 40px 20px;
                    text-align: center;
                }
                .footer-content {
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    max-width: 1000px;
                    margin: 0 auto;
                    text-align: left;
                }
                .contact-button {
                    background: linear-gradient(135deg, #4caf50, #2e7d32);
                    color: white;
                    padding: 12px 18px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background 0.3s;
                }
                .contact-button:hover {
                    background: linear-gradient(135deg, #2e7d32, #1b5e20);
                }
                .footer-divider {
                    border: 0;
                    height: 1px;
                    background: #444;
                    margin: 20px 0;
                }
                .services ul {
                    list-style: none;
                    padding: 0;
                }
                .services li {
                    margin: 8px 0;
                }
                .footer-text {
                    margin-top: 15px;
                    font-size: 14px;
                    opacity: 0.8;
                }
            `}</style>
        </footer>
    );
}
