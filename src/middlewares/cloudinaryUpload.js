const multer = require('multer');
const { cloudinary } = require('../../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

exports.cloudUpload = (fieldName) => {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
      let extension = file.fieldname === 'file' ? '.epub' : '';
      return {
        folder: `library/${file.fieldname}s`,
        resource_type: file.fieldname === 'file' ? 'raw' : 'image',
        public_id: file.fieldname + '-' + Date.now() + extension,
      };
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'file') {
      fileType = 'epub';
      limitSize = '5 MB';
    } else {
      fileType = 'image';
      limitSize = '2 MB';
    }

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
