import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cd(null, path.join(__dirname, "../uploads"))
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname}`)
    }
})

const uploadPicture = multer({
    storage: storage
})  