const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug)
 
const Schema = mongoose.Schema

const Course = new Schema({
    name: {type: String},
    img: {type: String },
    price: {type: String},
    courseId : {type: String},
    slug: {type: String, slug: 'name', unique: true}

},{
    timestamps: true
})

module.exports = mongoose.model('Course', Course);