import fs from "fs";
import path from "path";

export default function handler(req, res) {
    if (req.method !== "DELETE") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { path: imagePath } = req.query;
    if (!imagePath) {
        return res.status(400).json({ error: "Missing image path" });
    }

    try {
        const fullPath = path.join(process.cwd(), "public", imagePath);

        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
            return res.status(200).json({ success: true });
        } else {
            return res.status(404).json({ error: "File not found" });
        }
    } catch (error) {
        console.error("Error deleting image:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
