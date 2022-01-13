import gql from 'graphql-tag';


export default gql`
    mutation addReview($id: ID, $review: String){
        addReview(id:$id, review: $review){
            id
            title
        }
    }
`