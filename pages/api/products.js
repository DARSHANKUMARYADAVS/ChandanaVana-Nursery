import fs from "fs";
import path from "path";

export default function handler(req, res) {
    try {
        const imagesDir = path.join(process.cwd(), "public/tmp");

        // Ensure the directory exists
        if (!fs.existsSync(imagesDir)) {
            return res.status(200).json([]);
        }

        // Read all image files from the directory
        const files = fs.readdirSync(imagesDir);

        // Extract product details from filenames (e.g., "rose-20.jpg" -> { name: "rose", price: 20 })
        const products = files
            .filter(file => file.match(/^.+-\d+\.(jpg|png|jpeg)$/)) // Ensure valid filename format
            .map(file => {
                const [name, priceWithExt] = file.split("-");
                const price = priceWithExt.split(".")[0]; // Remove file extension
                return { name, price: parseFloat(price), imageUrl: `/tmp/${file}` };
            });

        return res.status(200).json(products);
    } catch (error) {
        console.error("Error reading product images:", error);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}
