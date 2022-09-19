const newRouter = require('./new.route')
const siteRouter = require('./site.route')
const courseRouter = require('./course.route')

function route(app) {

    app.use('/news', newRouter)
    app.use('/course', courseRouter)
    app.use('/', siteRouter)

}

module.exports = route