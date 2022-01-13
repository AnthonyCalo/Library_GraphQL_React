const graphql=require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList, 
    GraphQLID
}=graphql;
const AuthService = require("../services/auth.js")
const UserType = require("./types/user_type");
const BookType=require("./types/book_type");
const {DetailType}=require("./types/book_detail_type");
const {addReview, addToReadingList, addToBookShelf, getUserBooks, deleteBook}=require("../services/book_services");

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        signup: {
            type: UserType,
            args:{
                email: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            resolve(parentValue, {email, password}, req){
                return AuthService.signup({email, password, req});
            } 
        },
        logout: {
            type: UserType,
            resolve(parentValue, args, req){
                const {user}=req;
                req.logout();
                return user;
            }
        },
        login: {
            type: UserType,
            args: {
                email: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            resolve(parentValue, {email, password}, req){
                return AuthService.login({email, password, req});
            }
        },
        addToBookShelf:{
            type: BookType,
            args:{
                title: {type: GraphQLString},
                author: {type: GraphQLString},
                genre: {type: GraphQLString},
                imageUrl: {type: GraphQLString}
            },
            resolve(parentValue, {title, author, genre, imageUrl}, req){
                return( addToBookShelf({title, author, genre, imageUrl, userId: req.user._id}))
            }
        },
        addToList:{
            type: BookType,
            args:{
                title: {type: GraphQLString},
                author: {type: GraphQLString},
                genre: {type: GraphQLString},
                imageUrl: {type: GraphQLString}
            },
            resolve(parentValue, {title, author, genre, imageUrl}, req){
                return( addToReadingList({title,author,imageUrl, genre, userId: req.user._id}));
            }
        },
        deleteBook: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parentValue, {id}, req){
                return (deleteBook(id));
            }
        },
        addReview: {
            type: BookType,
            args: {id: {type: GraphQLID}, review: {type: GraphQLString}},
            resolve(parentValue, {id, review}, req){
                return (addReview(id, review))
            }
        }
    }

});




module.exports=mutation;