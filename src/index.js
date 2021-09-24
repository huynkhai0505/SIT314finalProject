const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require('morgan');
const handlebars = require('express-handlebars')
const path = require('path');
const { ESRCH } = require('constants');
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override');
const SortMiddleware = require('./app/middlewares/SortMiddleware');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const auth = require('./app/middlewares/auth')

dotenv.config();

app.use(cors({
    credentials: true
}))

//Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());
app.use(cookieParser());

app.use(methodOverride('_method'));

//Custom middleware
app.use(SortMiddleware)
app.use(/\/((?!auth).)*/, auth)

// app.use(morgan('combined'));

app.engine('hbs', handlebars({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
        sortable: (field, sort) => {
            const sortType = field === sort.column ? sort.type : 'default';
            const icons = {
                default: 'oi oi-elevator',
                asc: 'oi oi-sort-ascending',
                desc: 'oi oi-sort-descending'
            }
            const types = { 
                default: 'desc',
                asc: 'desc',
                desc: 'asc'
            }

            const icon = icons[sortType];
            const type = types[sortType];

            return `<a href="?_sort&column=${field}&type=${type}">
                        <span class="${icon}"></span>
                    </a>`;
        }
    }
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Route init
route(app);


app.listen(PORT, () => {
    console.log(`App is runnning on ${PORT}`)
}) 