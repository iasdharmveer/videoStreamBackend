import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ 
    storage, 
})
 
/**chatGPT code to fix error */
// import multer from "multer";
// import fs from 'fs';
// import path from 'path';

// const dir = '../public/temp';

// if (!fs.existsSync(dir)){
//     fs.mkdirSync(dir, { recursive: true });
// }

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, dir)
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// })

// export const upload = multer({ storage });
