
const siteRouter = require('./site');
const meRouter = require('./me');
const lightRouter = require('./lights');
const authRouter = require('./auth');

function route(app) {
    app.use('/auth', authRouter);
    app.use('/me', meRouter);
    app.use('/lights', lightRouter);
    app.use('/', siteRouter);

}

module.exports = route;
