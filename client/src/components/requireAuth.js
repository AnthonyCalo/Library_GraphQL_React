import React from 'react';
import query from "../queries/CurrentUser";
import {graphql} from "react-apollo";
import {hashHistory} from "react-router";

export default (WrappedComponent) => {
    class RequireAuth extends React.Component{
        componentWillUpdate(nextProps){
            if (!nextProps.data.loading && !nextProps.data.user){
                hashHistory.push("/home");
            }
        }
        render(){
            return (<WrappedComponent {...this.props}/>)
        }
    }
    
    
    return graphql(query)(RequireAuth);
}
