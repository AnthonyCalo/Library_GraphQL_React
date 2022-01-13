import gql from 'graphql-tag';

export default gql`
    mutation AddToList($author: String, $title: String, $imageUrl: String,$genre: String){
        addToList(author:$author, title:$title, imageUrl: $imageUrl, genre:$genre){
            title
            id
        }
    }
`