const gql = require("graphql-tag");
const graphql= require('graphql');
const { GraphQLID } = require("graphql");
const {GraphQLObjectType,
GraphQLString, GraphQLList}=graphql;
const BookType=require("./book_type");
const {getUserBooks, getUserReadingList}=require("../../services/book_services");

//each user has a reading list and a bookShelf
const UserType=new GraphQLObjectType({
    name: "UserType",
    fields: {
        id: {type: GraphQLID},
        email: { type: GraphQLString},
        bookShelf: {
            type: GraphQLList(BookType),
            resolve: (user)=>{
                return getUserBooks(user.id)
            }
        },
        readingList: {
            type: GraphQLList(BookType),
            resolve: (user)=>{
                return getUserReadingList(user.id)
            }
        }   
    }
});

module.exports=UserType;