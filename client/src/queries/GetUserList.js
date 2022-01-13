import gql from "graphql-tag";

export default gql`
    query GetUserList{
        user{
            id
            readingList{
                title
                id
                author
                imageUrl
            }
            bookShelf{
                title
                id
                imageUrl
                author
            }
        }
    }
`;