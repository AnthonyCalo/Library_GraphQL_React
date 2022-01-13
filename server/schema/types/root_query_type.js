const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLList,GraphQLID } = graphql;
const UserType = require('./user_type');
const {getUserBooks, getBook} = require("../../services/book_services")
const BookType=require("../types/book_type");


const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields:{
    user: {
      type: UserType,
      resolve(parentValue, args, req){
        console.log("User request called now")
        return req.user;
      }
    },
    userBooks:{
      type:GraphQLList(BookType),
      resolve(parentValue,args, req){
          console.log("User request called now")
          return(getUserBooks(req.user._id))
      }
  },
  getBookDetail:{
    type: BookType,
    args: {
      id: {type: GraphQLID}
    },
    resolve(parentValue, args, req){
      console.log("searchBooks")
      return (getBook(args.id))
    }
  }
  } 
});

module.exports = RootQueryType;