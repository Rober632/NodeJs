const todoController = require('../controller/todoController')
const router = require('express').Router()

router.get('/' , todoController.home)
router.get('/add' , todoController.add)
router.post('/addLogic' , todoController.addLogic)
router.get('/show/:id' , todoController.show)
router.get('/delete/:id' , todoController.delete)
router.get('/activate/:id' , todoController.activate)
router.get('/deleteAll' , todoController.deleteAll)
router.get('/edit/:id' , todoController.edit)
router.get('/search' , todoController.search)
router.post('/editLogic' , todoController.editLogic)

module.exports = router