const Course = require('../models/Course')
const { MongosToObject } = require('../../util/mongoose')

class SiteController {
  // [GET] /home
  index(req, res, next) {
    Course.find({})
      .then(Courses => {
            // Courses = Courses.map(value => value.toObject())
        // Courses = MongosToObject(Courses)
        res.render('home', { Courses: MongosToObject(Courses)  })
      })
      .catch(next)
  }
}

module.exports = new SiteController()
