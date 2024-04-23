import multer from 'multer';
import path from 'path';

//Image Upload
const imageStorage = multer.diskStorage({
  //Destination to store image
  // destination: 'images',
  destination: (req, file, cb) => {
    cb(null, __dirname + '/../../uploads/'); // null aren't showing an error
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  },
});
const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(req: any, file: any, cb: any) {
    console.log('__dirname', __dirname);
    if (!file.originalname.match(/\.(png|jpg|JPG|jpeg)$/)) {
      return cb(new Error('Image uploaded is not of type jpg/png/JPG or jpeg'));
    }
    cb(null, true);
  },
});

export default imageUpload;
