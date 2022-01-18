const multer = require('multer');
const path = require('path');


module.exports = (multer({
    storage:  multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '../uploads/'));
        },
        filename: function (req, file, cb) {
           cb(null, req.params.id.concat('.jpeg'))
        }
      }),
      fileFilter: (req, file, cb) => {

        console.log(file.mimetype);

          const extensaoImg = ['image/jpeg'].find(formatoAceito => formatoAceito == file.mimetype);
      
          if(extensaoImg){
              return cb(null, true);
          }

          return cb(null, false);

        }
      
      

}



));

  