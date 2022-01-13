import React from 'react';
import query from "../queries/CurrentUser";
import {graphql} from "react-apollo";
import {Link} from "react-router";
import mutation from "../mutations/Logout";

class Header extends React.Component{
    onLogoutClick(){
        this.props.mutate({
            refetchQueries: [{query}]
        })
    }
    renderButtons(){
        const {loading, user} = this.props.data;
        if(loading) {return <div />;}

        if(user){
            return(
                <div className="fullWidth"> 
                    <li className="navbarItemLIOne"><Link to="/home">HomePage</Link></li>
                    <li className="navbarItemLIOne"><Link to="/search">Search</Link></li>
                    <li className="navbarItemLI"><Link to="/myshelf">My Shelf</Link></li>
                    <li className="navbarItemLI"><Link to="/myList">ReadingList</Link></li>
                    <li className="navbarItemLI"><a onClick={this.onLogoutClick.bind(this)}>Logout</a></li>
                </div>
            )
        }else{
            return ( 
                <div className="notAuthHeader">
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </div>
            );
        }
    }
    render(){
        return(
        <nav>
            <div className="nav-wrapper header">
                <ul className="navBarDiv">
                    {this.renderButtons()}
                </ul>
            </div>
        </nav>
        )
    }
}

export default graphql(mutation)
    (graphql(query)(Header));