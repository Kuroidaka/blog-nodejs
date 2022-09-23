const express = require('express')
const router = express.Router()

const courseController = require('../app/controllers/courseController')

   
router.get('/create', courseController.create)
router.post('/store', courseController.store)
router.get('/:id/edit', courseController.edit)
router.patch('/:id/restore', courseController.restore)
router.post('/handle-form-actions', courseController.handleFormActions)
router.put('/:id' , courseController.update)
router.delete('/:id', courseController.destroy)
router.delete('/:id/forceDestroy', courseController.forceDestroy)
router.get('/:slug', courseController.show)
// router.get('/', courseController.show)

module.exports = router
