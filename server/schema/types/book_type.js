const gql = require("graphql-tag");
const graphql= require('graphql');
const { GraphQLID, GraphQLNonNull } = require("graphql");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean}=graphql;
const {DetailType}=require('./book_detail_type');

const BookType= new GraphQLObjectType({
    name: "BookType",
    fields: {
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        author: {type: GraphQLString},
        genre: {type: GraphQLString},
        userId: {type: GraphQLNonNull(GraphQLID)},
        imageUrl:{type: GraphQLString},
        watchList: {type: GraphQLBoolean},
        review: {type: GraphQLString},
        notes: {type: graphql.GraphQLList(GraphQLString)}      
    }
})

module.exports=BookType;