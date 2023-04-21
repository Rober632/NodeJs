const multer  = require('multer')
const upload = multer({ dest: 'resources/public/' })
module.exports = upload