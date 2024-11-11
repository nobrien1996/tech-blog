//REQUIRES

const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routers = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


//SERVER SETTINGS

const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({ helpers });
const sess = {
    secret: 'Super top secret',
    cookie: {
        maxAge: 500000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

//SET TEMPLATE ENGINE
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync({ force : false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});