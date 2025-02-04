import express from 'express'
import { addDesign, listDesign, removeDesign } from '../controllers/DesignController.js'
import multer from 'multer'

const designRouter = express.Router();

//Image Storage Engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

designRouter.post("/add",upload.single("image"),addDesign)
designRouter.get("/list",listDesign)
designRouter.post("/remove",removeDesign)



export default designRouter;