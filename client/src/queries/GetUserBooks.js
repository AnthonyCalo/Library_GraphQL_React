import gql from "graphql-tag";

export default gql`
    query GetUserBooks{
        user{
            id
            email
            bookShelf{
                title
                id
                author
                imageUrl
            }
            readingList{
                id
            }
        }
    }
`;