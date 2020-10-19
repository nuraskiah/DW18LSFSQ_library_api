const multer = require('multer');
const path = require('path');

exports.upload = (fieldName) => {
  // set storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `public/${file.fieldname}s`);
    },
    filename: (req, file, cb) => {
      let extension = file.fieldname === 'file' ? '.epub' : '.png';
      cb(null, file.fieldname + '-' + Date.now() + extension);
    },
  });

  let fileType, limitSize;

  // set filter
  const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'file') {
      fileType = 'epub';
      limitSize = '5 MB';
    } else {
      fileType = 'image';
      limitSize = '2 MB';
    }

    console.log('FILE MIME TYPE', file.mimetype);

    const extname = path.extname(file.originalname).toLowerCase();
    if (!file.mimetype.match(fileType)) {
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
      fileFilter,
      limits: {
        fileSize: 2 * 1000 * 1000,
      },
    }).single('photo');
  } else {
    upload = multer({
      storage,
      fileFilter,
      limits: {
        fileSize: 5 * 1000 * 1000,
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
