import gql from "graphql-tag";

//error when not naming mutation

export default gql`
    mutation logout{
        logout{
            email
        }
    }
`