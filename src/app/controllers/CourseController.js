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

  store(req, res, next) {
    req.body.img = `https://i.ytimg.com/vi/${req.body.courseId}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAxZ9cqvU8t-_eKWK_C6gCGr0PcWw`
    const course = new Course(req.body)
    course.save().
    then(() => res.redirect('/'))


  }

}

module.exports = new CourseController()
