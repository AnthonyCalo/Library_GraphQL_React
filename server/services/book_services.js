const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BookSchema=new Schema({
    title: {type: String},
    author: {type:String},
    genre: {type: String},
    userId: {
        type: Schema.Types.ObjectId,
        ref:"user"
    },
    watchList:{type: Boolean},
    imageUrl:{type:String},
    review: {type: String},
    notes: {type: [String]}
})

const Book= mongoose.model('book', BookSchema);


function addToBookShelf({title, author, genre, userId, imageUrl}){
    let book=new Book({title, author, genre, userId, imageUrl, watchList: false, review: ""})
    return (book.save())
}
async function getUserBooks(userId){
    let userBooks = await Book.find({"userId": userId, "watchList": false})
    return userBooks
}
function addToReadingList({title, author, genre, userId, imageUrl}){
    let book=new Book({title, author, genre, userId, imageUrl, watchList: true})
    console.log("ADDING TO READING LIST", book, "HERE <--- Reading list add good");
    return (book.save())
}
async function getUserReadingList(userId){
    let userList= await Book.find({"userId":userId, "watchList":true});
    return userList
}
function deleteBook(id){
    return (Book.remove({_id: id}));
}
function addReview(id,review){
    Book.findOne({_id: id}, (err, book)=>{
        if(err) throw err;
        console.log(book.review)
        //Mongo saves ',' as new lines so this way it will display each post as new line when you press enter
        //useful if writing multiple paragraphs that you want to seperate and space out
        realReview = review.replace(/\r\n/g, ',')
        book.review=realReview;
        book.save();
        // book.save()
    });
}
function addNotes(id, note){
    Book.findOne({_id:id}, (err, book)=>{
        if(err) throw err;
        book.notes.push(note);
        book.save();
        console.log("note added: ", note)
    })
}

async function getBook(id){
    return(Book.findOne({_id:id}))
}


module.exports= {addNotes,getBook, addReview, addToReadingList, getUserBooks, getUserReadingList,addToBookShelf, deleteBook};