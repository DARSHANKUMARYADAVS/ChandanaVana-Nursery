import { put } from "@vercel/blob";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const file = req.body.file; // Expecting file from frontend

        if (!file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Upload file to Vercel Blob Storage
        const blob = await put(`uploads/${file.name}`, file, {
            access: "public", // Allow public access
        });

        return res.status(200).json({ url: blob.url }); // Return the image URL
    } catch (error) {
        return res.status(500).json({ error: "Image upload failed", details: error.message });
    }
}
