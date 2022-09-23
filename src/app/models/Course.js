const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
var mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const Course = new Schema(
  {
    name: { type: String },
    img: { type: String },
    price: { type: String },
    courseId: { type: String },
    slug: { type: String, slug: 'name', unique: true },
  },
  {
    timestamps: true,
  },
)

mongoose.plugin(slug)
Course.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true, deleted: false })

module.exports = mongoose.model('Course', Course)
