const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BookSchema=new Schema({
    title: {type: String},
    author: {type:String},
    genre: {type: String},
    id: {type: ID},
    userId: {
        type: Schema.Types.ObjectId,
    },
    watchList: {type: Boolean}
})

mongoose.model('book', BookSchema);