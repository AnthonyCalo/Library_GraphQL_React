import React from 'react';
import {Link} from "react-router";

class HomePage extends React.Component{
    render(){
        return ( 
            <div className="homePage">
                <div className="homeTextDiv">
                    <div className="homeText">
                        Login or Register to create custom bookshelf
                    </div>
                    <br/>
                    <br/>
                    <div className="homeBtn">
                    <Link to="/register"><button className="loginBtn">Register</button></Link>
                    <Link to="/login"><button className="loginBtn">Login</button></Link>
                    </div>
                </div>
            </div>
        )}
}

export default HomePage