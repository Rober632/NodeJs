const movieController = require('../controller/movieController')
const router = require('express').Router()
const upload = require('../middleware/upload')
const auth = require('../middleware/auth')

router.post("/add" ,upload.single("image") , movieController.add)
router.delete("/delete/:id" , movieController.delete)
router.delete("/delete" , movieController.deleteAll)
router.post("/edit" , movieController.edit)
router.get("/show" , movieController.show)
router.get('/show/:movieId' ,  movieController.showMovie)


module.exports = router