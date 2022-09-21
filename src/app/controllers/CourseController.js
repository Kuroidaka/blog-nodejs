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
    .then(() => res.redirect('/'))
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

  destroy(req, res, next) {
    Course.deleteOne({_id: req.params.id})
    .then(() => res.redirect('back'))
    .then(next)
  }
   
}

module.exports = new CourseController()
