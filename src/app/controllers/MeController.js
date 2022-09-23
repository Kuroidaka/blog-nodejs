const Course = require('../models/Course')
const { MongosToObject } = require('../../util/mongoose')

class MeController {
    // [SHOW] /me/stored
    show(req, res, next) {
        const courseRender = Course.find({})

        // res.json(res.locals._sort)
        if(req.query.hasOwnProperty('_sort'))
            courseRender.sort({
                [req.query.column]: req.query.type
            })

        Promise.all([courseRender, Course.countDocumentsDeleted()])
            .then(([course,  deleteCount]) => res.render('me/stored/course', 
                {   
                    deleteCount,
                    course: MongosToObject(course),
                }))
            .catch(next)

    }


    trash(req, res, next) {
        Course.findDeleted({})
        .then(course => res.render('me/trash/course', { course: MongosToObject(course) }))
        .catch(next)
    }

}

module.exports = new MeController