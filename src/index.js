const express = require('express')
const path = require('path')
const morgan = require('morgan')
var { engine } = require('express-handlebars');
const app = express()
const port = 3000
const route = require('./routes')
const db = require('./config/db')

const bodyParser = require('body-parser');
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);
app.use(bodyParser.json());

//connect to DB
db.connect()

app.use(express.static(path.join(__dirname,'public')))

// HTTP logger
app.use(morgan('combined'))

//template engine 
app.engine('hbs', engine({extname: 'hbs'}))

app.set('view engine', 'hbs')

app.set('views', path.join(__dirname, 'resources', 'views'))




route(app)

app.listen(port, () => console.log(`listening at port http://localhost:${port}`))