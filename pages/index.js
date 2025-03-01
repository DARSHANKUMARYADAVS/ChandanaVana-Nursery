import fs from "fs";
import path from "path";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import ProductList from "../components/ProductList";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

export async function getStaticProps() {
  const imgDirectory = path.join(process.cwd(), "public/tmp");
  const files = fs.readdirSync(imgDirectory);

  const products = files
    .filter((file) => file.match(/.*-\d+\.(jpg|png|jpeg)$/i)) // Match "Name-Price.jpg"
    .map((file, index) => {
      const [name, price] = file.replace(/\.[^/.]+$/, "").split("-"); // Remove extension & split
      return {
        id: index + 1,
        name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize first letter
        price: parseInt(price, 10), // Convert price to number
        image: `/tmp/${file}`, // Public image path
      };
    });

  return {
    props: { products },
  };
}

export default function Home({ products }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  return (
    <div className="app">
      <Header cart={cart} setIsCartOpen={setIsCartOpen} />
      <main className="content">

        {/* Carousel Section */}
        <div className="carousel-container">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={3}
            navigation
            autoplay={{ delay: 3000 }}
            loop={true}
            className="swiper-wrapper"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="swiper-slide">
                <img
                  src={product.image}
                  alt={product.name}
                  className="carousel-image"
                  onError={(e) => (e.target.style.display = "none")} // Hide image if it fails to load
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Product Section */}
        <div id="product-section">
          <ProductList products={products} addToCart={addToCart} />
        </div>

        {/* Cart Modal */}
        {isCartOpen && <Cart cart={cart} setCart={setCart} onClose={() => setIsCartOpen(false)} />}
      </main>

      {/* Footer Section */}
      <div id="footer-section">
        <Footer />
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .carousel-container {
          max-width: auto;
          margin: 20px auto;
          text-align: center;
        }
        .swiper-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .carousel-image {
          width: 100%;
          max-width: 800px;
          height: 400px;
          object-fit: cover;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
