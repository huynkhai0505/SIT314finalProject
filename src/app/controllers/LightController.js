const Light = require('../models/Light');
const {multipleMongooseToObject, mongooseToObject} = require('../../util/mongoose')

class LightController {

    //GET /lights/:slug
    show(req, res, next) {
        Light.findOne({slug: req.params.slug})
            .then(lights => {
                res.render('lights/show', {lights: mongooseToObject(lights)})
            })
            .catch(next)
    }

    create(req, res, next) {
        res.render('lights/create')
    }

    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const light = new Light(req.body);
        light.save()
            .then(() => res.redirect('/me/stored/lights'))
            .catch(next)
    }

    //GET lights/:id/edit
    edit(req, res, next) {
        Light.findById(req.params.id)
            .then(light => res.render('lights/edit', {
                light: mongooseToObject(light)
            }))
            .catch(next);
    }

    //PUT lights/id
    update(req, res, next) {
        Light.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/lights'))
            .catch(next);
    }

    // DELETE lights/id
    destroy(req, res, next) {
        Light.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
     // DELETE courses/id/force
    forceDestroy(req, res, next) {
        Light.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //PATCH  courses/:id/restore
    restore (req, res, next) {
        Light.restore({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);  
    }

    handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Light.delete({_id: {$in : req.body.lightIds} })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;

            case 'update':
                Light.findById(req.body.lightIds)
                    .then(light => res.send({
                        light: mongooseToObject(light)
                    }))
                    .catch(next)
                break;
            default:
                res.json({message: "Action is invalid"})
        }
    }

}

module.exports = new LightController;