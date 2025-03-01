import fs from "fs";
import path from "path";
import formidable from "formidable";

export const config = {
    api: { bodyParser: false }, // Disable default body parsing
};

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const uploadDir = path.join(process.cwd(), "public/tmp");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const form = formidable({ uploadDir, keepExtensions: true });

        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(500).json({ error: "File upload error", details: err.message });
            }

            const file = files.file[0]; // Fix accessing file object
            const newPath = path.join(uploadDir, file.originalFilename);

            fs.rename(file.filepath, newPath, (renameErr) => {
                if (renameErr) {
                    return res.status(500).json({ error: "File rename failed", details: renameErr.message });
                }

                res.status(200).json({ imageUrl: `/tmp/${file.originalFilename}` });
            });
        });
    } catch (error) {
        console.error("Upload API error:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}
