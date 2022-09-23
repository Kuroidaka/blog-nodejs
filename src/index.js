const express = require('express')
const path = require('path')
const morgan = require('morgan')
var { engine } = require('express-handlebars');
const app = express()
const port = 3000
const route = require('./routes')
const db = require('./config/db')
const methodOverride = require('method-override')
const sortMiddleWare = require('./app/middleware/sortMiddleWare')

const bodyParser = require('body-parser');
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

app.use(express.urlencoded({ extended: false }))

app.use(bodyParser.json());

//connect to DB
db.connect()

app.use(express.static(path.join(__dirname,'public')))

// HTTP logger
app.use(morgan('dev'))

app.use(methodOverride('_method'))

// custom middleware 
app.use(sortMiddleWare)

//template engine 
app.engine('hbs', engine({
    extname: 'hbs',
    helpers: {
        sum: (a,b) => {return (a + b)},
        sortable: (field, sort) => {
            const sortType = field === sort.column? sort.type : 'default'

            const icons = {
                default: 'funnel-outline',
                desc: 'trending-down-outline',
                asc: 'trending-up-outline'
            }
            const types = {
                default: 'desc',
                desc: 'asc',
                asc: 'desc'
            }

            const icon = icons[sortType]
            const type = types[sortType]

            return `
            <a href="?_sort&column=${field}&type=${type}"><ion-icon name="${icon}"></ion-icon></a>`

        }
    }
}))

app.set('view engine', 'hbs')

app.set('views', path.join(__dirname, 'resources', 'views'))




route(app)

app.listen(port, () => console.log(`listening at port http://localhost:${port}`))