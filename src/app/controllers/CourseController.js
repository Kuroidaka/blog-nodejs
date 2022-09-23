const Course = require('../models/Course')
const { MongoToObject } = require('../../util/mongoose')

class CourseController {
  // [SHOW] /Course
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) =>
        res.render('course/show', { course: MongoToObject(course) }),
      )
      .catch(next)
  }

  create(req, res, next) {
    res.render('course/create')
  }

  // [GET] /course/stored
  store(req, res, next) {
    req.body.img = `https://i.ytimg.com/vi/${req.body.courseId}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAxZ9cqvU8t-_eKWK_C6gCGr0PcWw`
    const course = new Course(req.body)
    course.save()
    .then(() => res.redirect('/me/stored/course'))

    
  }

    // [GET] /course/update
  edit(req, res, next) {
    Course.findById(req.params.id)
    .then(course => res.render('course/update' ,{course: MongoToObject(course)}))
    .catch(next)
  }

    //   [PUT] /course/id
  update(req, res, next) {
    req.body.img = `https://i.ytimg.com/vi/${req.body.courseId}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAxZ9cqvU8t-_eKWK_C6gCGr0PcWw`

    Course.updateOne({_id: req.params.id}, req.body )
    .then(() => res.redirect('/me/stored/course'))
    .catch(next)
  }
  //   [DELETE] /course/id
  destroy(req, res, next) {
    Course.delete({_id: req.params.id})
    .then(() => res.redirect('back'))
    .catch(next)
  }

  //   [DELETE] /course/id/forceDestroy
  forceDestroy(req, res, next) {
    Course.deleteOne({_id: req.params.id})
    .then(() => res.redirect('back'))
    .catch(next)
  }

   //   [PATCH] /course/id/restore
    restore(req, res, next) {
      Course.restore({ _id: req.params.id})
      .then(() => res.redirect('back'))
      .catch(next)
    }
    //[POST] /course/handle-form-action
    handleFormActions(req, res, next) {
      switch(req.body.action){
        case 'delete':
            Course.delete({_id: {$in: req.body.courseIds} })
            .then(() => res.redirect('back'))
            .catch(next)
            break
        case 'restore':
            Course.restore({_id: {$in : req.body.courseIds} })
            .then(() => res.redirect('back'))
            .catch(next)
            break
        case 'forceDelete':
            Course.deleteMany({_id: {$in : req.body.courseIds}})
            .then(() => res.redirect('back'))
            .catch(next)
            break
        default:
          res.json({message: 'action invalid'})


      }
    }
   
}

module.exports = new CourseController()
