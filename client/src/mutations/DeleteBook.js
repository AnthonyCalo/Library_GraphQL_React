import gql from 'graphql-tag';

export default gql`
    mutation DeleteBook($id: ID){
        deleteBook(id:$id){
            id
        }
    }
`