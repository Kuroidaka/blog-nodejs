module.exports = {
    MongosToObject : (mongooses) => {
        return mongooses = mongooses.map(mongoose => mongoose.toObject())
    },

    MongoToObject : (mongoose) => {
        return mongoose? mongoose.toObject() : mongoose
    }

}