import gql from "graphql-tag";

export default gql`
   {
        getBookDetail(id: $id){
            title
            author
            notes
            review
        }
    }
`