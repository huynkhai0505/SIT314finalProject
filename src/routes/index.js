
const siteRouter = require('./site');
const meRouter = require('./me');
const lightRouter = require('./lights');

function route(app) {
    app.use('/me', meRouter);
    app.use('/lights', lightRouter);
    app.use('/', siteRouter);

}

module.exports = route;
