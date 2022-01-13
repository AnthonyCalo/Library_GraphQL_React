const gql = require("graphql-tag");
const graphql= require('graphql');
const { GraphQLID, GraphQLNonNull } = require("graphql");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLBoolean}=graphql;

const DetailType= new GraphQLObjectType({
    name: "DetailType",
    fields: {
        id: {type: GraphQLID},
        notes: {type: GraphQLList(GraphQLString)},
        review: {type: GraphQLString},
        bookId: {type: GraphQLNonNull(GraphQLID)},
        userId: {type: GraphQLNonNull(GraphQLID)},
    }
})

module.exports={DetailType}