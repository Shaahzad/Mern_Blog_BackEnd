import multer from "multer";
import path from 'path';
import { fileURLToPath } from 'url';

// Manually define __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const uploadPicture = multer({
    storage: storage,
    limits: {
        fileSize: 1 * 1000000  // 1MB limit
    },
    fileFilter: function(req, file, cb) {
        const ext = path.extname(file.originalname);
        if(ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            return cb(new Error("Only images are allowed"));
        }
        cb(null, true);
    }
});

export default uploadPicture;
