const newRouter = require('./new.route')
const siteRouter = require('./site.route')
const courseRouter = require('./course.route')
const meRouter = require('./me.route')

function route(app) {

    app.use('/news', newRouter)
    app.use('/course', courseRouter)
    app.use('/me/stored', meRouter)
    app.use('/', siteRouter)

}

module.exports = route