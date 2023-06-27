import multer from "multer";
import {GridFsStorage} from "multer-gridfs-storage";
import dotenv from "dotenv";

 dotenv.config()
const Username= process.env.DB_USERNAME;
const Password= process.env.DB_PASSWORD;
const storage = new GridFsStorage({
 url :`mongodb+srv://${Username}:${Password}@blog-app.mbdlujq.mongodb.net/?retryWrites=true&w=majority`,
 options :{useNewUrlParser : true},
 file : (request, file) => {
    const match = ["image/png", "image/jpg", "image/jpeg"];

    if(match.indexOf(file.memeType) === -1 ){
        return `${Date.now()}-blog-${file.originalname}`;
    }

    return {
        bucketName : "photos",
        filename : `${Date.now()}-blog-${file.originalname}`
    }
 }
})

export default multer({storage});