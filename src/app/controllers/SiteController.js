const Light = require('../models/Light');
const {multipleMongooseToObject} = require('../../util/mongoose')

class SiteController {
    //GET /home
    index(req, res, next) {
        Light.find({})
            .then(lights => {
                res.render('home1', {lights: multipleMongooseToObject(lights)})
            })
            .catch(next);
    }

    //GET /search
    search(req, res) {
        res.render('search')
    }
}

module.exports = new SiteController;