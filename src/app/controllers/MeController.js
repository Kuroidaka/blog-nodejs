const Course = require('../models/Course')
const { MongosToObject } = require('../../util/mongoose')

class MeController {
    // [SHOW] /me/stored
    show(req, res, next) {
        Course.find({})
        .then(course => res.render('me/stored/course', { course: MongosToObject(course) }))
        .catch(next)
    }

}

module.exports = new MeController