const userController = require("../controller/userController")
const router = require('express').Router()


router.get("/" , userController.home)
router.post("/register" , userController.register)
router.post("/login" , userController.login)
router.post("/book" , userController.book)
router.delete("/delete" , userController.delete)
router.get("/show" , userController.show)

module.exports = router
