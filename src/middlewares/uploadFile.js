const multer = require('multer');
const path = require('path');

exports.upload = (fieldName) => {
  // set storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `public/${file.fieldname}s`);
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + '-' + Date.now() + path.extname(file.originalname)
      );
    },
  });

  let validExtension, fileType, maxSize, limitSize;

  // set filter
  const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'file') {
      validExtension = /\.(pdf|epub)$/;
      fileType = 'epub or pdf';
      maxSize = 5 * 1000 * 1000;
      limitSize = '5 MB';
    } else {
      validExtension = /\.(jpg|jpeg|png)$/;
      fileType = 'image';
      maxSize = 2 * 1000 * 1000;
      limitSize = '2 MB';
    }

    const extname = path.extname(file.originalname).toLowerCase();
    if (!extname.match(validExtension)) {
      req.fileValidationError = {
        status: 'fail',
        message: `Please select an ${fileType} file!`,
        code: 400,
      };
      return cb(new Error(`Please select an ${fileType} file!`), false);
    }

    cb(null, true);
  };

  // init upload
  let upload;
  if (fieldName === 'photo') {
    upload = multer({
      storage,
      limits: {
        fileSize: maxSize,
      },
    }).single(fieldName);
  } else {
    upload = multer({
      storage,
      fileFilter,
      limits: {
        fileSize: maxSize,
      },
    }).fields([{ name: 'cover' }, { name: 'file' }]);
  }

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (req.fileValidationError)
        return res.status(400).send(req.fileValidationError);

      if (!req.file && !req.files && !err)
        return res.status(400).send({
          status: 'fail',
          message: 'Please select a file to upload',
          code: 400,
        });

      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).send({
            status: 'fail',
            message: `Max file sized ${limitSize}`,
            code: 400,
          });
        }
        return res.status(400).send(err);
      }

      return next();
    });
  };
};
