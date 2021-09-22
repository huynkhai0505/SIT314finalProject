const Light = require('../models/Light');
const {multipleMongooseToObject} = require('../../util/mongoose')

class MeController {

    storedLights(req, res, next) {

        let lightQuery = Light.find({});
        
        //Sort 
        if(req.query.hasOwnProperty('_sort')) {
            lightQuery = lightQuery.sort({
                [req.query.column]: req.query.type
            });
        }

        Promise.all([lightQuery, Light.countDocumentsDeleted()])
            .then(([lights, deletedCount]) => 
                res.render('me/stored-lights', {
                    deletedCount,
                    lights: multipleMongooseToObject(lights)
                }))
                .catch(next);
    }

    trashLights(req, res, next) {
        Light.findDeleted({})
            .then(lights => res.render('me/trash-lights', {
                lights: multipleMongooseToObject(lights)
            }))
            .catch(next);
    }
}

module.exports = new MeController;