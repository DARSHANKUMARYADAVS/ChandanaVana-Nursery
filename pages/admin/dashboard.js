import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });
    const [imageFile, setImageFile] = useState(null);
    const router = useRouter();

    const fetchProducts = () => {
        fetch("/api/products")
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched products:", data); // Debugging
                setProducts(data);
            })
            .catch((error) => console.error("Error fetching products:", error));
    };


    useEffect(() => {
        if (localStorage.getItem("isAdmin") !== "true") {
            router.push("/admin/login");
        } else {
            fetchProducts();  // ✅ Fetch products on page load

        }
    }, [router]);


    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const objectUrl = URL.createObjectURL(file);
        setImageFile(file);
        setNewProduct((prev) => ({ ...prev, image: objectUrl }));

        // Cleanup previous image URL to prevent memory leak
        return () => URL.revokeObjectURL(objectUrl);
    };
    const handleAddProduct = async () => {
        if (!newProduct.name || !newProduct.price || !imageFile) {
            alert("Please fill in all fields and select an image.");
            return;
        }

        const formData = new FormData();
        formData.append("file", imageFile); // ✅ Ensure key is "file"

        try {
            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!uploadRes.ok) throw new Error("Image upload failed");

            const uploadData = await uploadRes.json();
            console.log("Image uploaded successfully:", uploadData);

            const productData = { ...newProduct, image: uploadData.imageUrl };

            const res = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productData),
            });

            if (!res.ok) throw new Error("Failed to add product");

            fetchProducts();
            setNewProduct({ name: "", price: "", image: "" });
            setImageFile(null);
        } catch (error) {
            console.error("Error:", error);
        }
    };


    const handleDeleteProduct = async (id, imagePath) => {
        try {
            console.log("Deleting product with ID:", id);
            console.log("Original image path:", imagePath);

            // Ensure correct image path format
            const formattedPath = imagePath.startsWith("/tmp/") ? imagePath.replace("/tmp/", "") : imagePath;
            console.log("Formatted path for deletion:", formattedPath);

            // Delete product from API
            const productResponse = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
            if (!productResponse.ok) {
                throw new Error("Failed to delete product from database");
            }

            // Delete the image file
            const imageResponse = await fetch(`/api/deleteImage?path=${formattedPath}`, { method: "DELETE" });
            if (!imageResponse.ok) {
                throw new Error("Failed to delete image file");
            }
            // ✅ Fetch latest products after adding
            // Update UI state
            setProducts((prev) => prev.filter((p) => p.id !== id));
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };



    return (
        <div className="dashboard-container">
            <header className="header">
                <h2> 🌿 ChandanaVana Nursery Dashboard</h2>
                <button className="logout-btn" onClick={() => { localStorage.removeItem("isAdmin"); router.push("/admin/login"); }}>Logout</button>
            </header>

            <div className="content">
                <div className="product-form">
                    <h3>Add New Product</h3>
                    <input type="text" placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                    <input type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                    <input type="file" onChange={handleImageSelect} />
                    {newProduct.image && <img src={newProduct.image} alt="Preview" className="preview-img" />}
                    <button className="add-btn" onClick={handleAddProduct}>Add Product</button>
                </div>

                <h3>Existing Products</h3>
                <div className="product-list">
                    {products.map((product) => {
                        const imagePath = `/tmp/${product.name}-${product.price}.jpg`;

                        return (
                            <div key={`${product.name}-${product.price}`} className="product-card">
                                <img
                                    src={imagePath}
                                    alt={product.name}
                                    className="product-img"
                                />
                                <p>{product.name} - ₹{product.price}</p>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDeleteProduct(product.id, `tmp/${product.name}-${product.price}.jpg`)}
                                >
                                    ❌ Delete
                                </button>
                            </div>
                        );
                    })}
                </div>



            </div>

            <style jsx>{`
.dashboard-container {
    max-width: 1200px;
    margin: auto;
    padding: 20px;
    text-align: center;
    background: #f9f9f9;
    border-radius: 12px;
}
.header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #136f19;
    padding: 15px 20px;
    color: white;
    border-radius: 10px;
}
.content {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.main-section {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
}
.product-list {
    flex: 2;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}
.product-card {
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    text-align: center;
    background: white;
    transition: transform 0.2s ease-in-out;
}
.product-card:hover {
    transform: scale(1.05);
}
.product-img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.product-form {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: #fff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    min-width: 320px;
}
.preview-img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-top: 10px;
    border-radius: 6px;
    border: 2px solid #ddd;
}
.add-btn, .delete-btn {
    background: #136f19;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
}
.delete-btn {
    background: red;
}
.add-btn:hover {
    background: #0e5714;
}
.delete-btn:hover {
    background: darkred;
}
.logout-btn {
    background: #f44336;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
}
.logout-btn:hover {
    background: #d32f2f;
}

    `}</style>
        </div>
    );
}
