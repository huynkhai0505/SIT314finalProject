const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete'); 
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const Light = new Schema({
        name: {type: String, required: true, getLength: 255},
        description: {type: String, maxLength: 600},
        videoId: {type: String, required: true, maxLength: 255},
        buildingLevel: {type: String, maxLength: 255},
        Status: {type: String, maxLength: 255},
        image: {type: String, maxLength: 255},
        slug: {type: String, slug: 'name', unique: true},
    }, 
    {
        timestamps: true,
    }
);

Light.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});

module.exports = mongoose.model('Light', Light);