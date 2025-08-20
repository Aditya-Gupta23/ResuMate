import multer from "multer"

const storage=multer.diskstorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`)
    },
})

const fileFilter=(req,file,ch)=>{
    const allowedTypes=["images/jpeg","image/png","image/jpg"];
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true)
    }
    else{
        cb(new Error("only .jpen, .png, .jpg are allowed"),false)
    }
}

const upload=multer({storage,fileFilter})
export default upload;