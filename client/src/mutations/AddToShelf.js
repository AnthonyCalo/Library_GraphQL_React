import gql from 'graphql-tag';

export default gql`
    mutation AddToBookShelf($author: String, $title: String, $imageUrl: String, $genre: String){
        addToBookShelf(author:$author, title:$title, imageUrl:$imageUrl, genre:$genre){
            title
            id
        }
    }
`