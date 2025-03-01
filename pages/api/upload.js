import multer from "multer";
import nextConnect from "next-connect";
import path from "path";
import fs from "fs";

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadDir = path.join(process.cwd(), "public/tmp");
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
    }),
});

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(500).json({ error: `Something went wrong: ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    },
});

apiRoute.use(upload.single("file"));

apiRoute.post((req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    const filePath = `/tmp/${req.file.filename}`;
    res.status(200).json({ imageUrl: filePath });
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false, // ✅ Important: Disable Next.js default body parser
    },
};
