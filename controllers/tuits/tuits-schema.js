import mongoose from "mongoose"; // load the mongoose library
const tuitsSchema = mongoose.Schema({ //create the schema
    topic: String,
    username: String,
    handle: String,
    time: String,
    image: String,
    title: String,
    tuit: String,
    replies: Number,
    retuits: Number,
    likes: Number,
    liked: Boolean
}, {collection: 'tuits'});       // collection name where tuits are stored in tuiter database
export default tuitsSchema;