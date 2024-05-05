const multer = require('multer')
const path = require('path')

// Creating and set Storage
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

// Initialize upload function
const upload = multer({
    storage: storage,
    limits: { fileSize: 80000000 },  // 10 megabytes = 80000000 bits
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }

})

// Check file type for image formats
function checkFileType(file, cb){
    const fileTypes = /jpeg|png|jpg|gif/
    const extname = fileTypes.test(path.extname(file.originalname.toLowerCase()))
    const mimetype = fileTypes.test(file.mimetype)

    if(mimetype && extname){
        return cb(null, true)
    } else{
        cb('Error: You can only upload image')
    }
}

module.exports = upload