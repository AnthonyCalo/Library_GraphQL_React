import React from 'react';
import mutation from "../mutations/AddToShelf";
import AddToList from "../mutations/AddToList";
import { graphql, compose } from 'react-apollo';
import "./searchResults.css";
import query from "../queries/GetUserBooks";
import query2 from "../queries/GetUserList"
import gql from "graphql-tag";
import Accordion from './Accordion';

const List_Query=gql`
    query getUserList{
        user{
            id
            readingList{
                title
                id
                author
                imageUrl
            }
        }
    }
`;

class BookResult extends React.Component{
    constructor(props){
        super(props);
        this.state={added: false, addedList: false}
    }
    renderAddedShelf(){
        if(!this.state.added){
            return (
                <a onClick={this.addToShelf.bind(this)} className="mutationClick">+ Add to book shelf</a>
            )
        }else{
            return( 
                <a className="mutationClick">added to book shelf</a>
            )
        }
    }
    renderAddedList(){
        if(!this.state.addedList){
            return (
                <a onClick={this.addToList.bind(this)} className="mutationClick">+ Add to book reading list</a>
            )
        }else{
            return( 
                <a className="mutationClick">added to reading list</a>
            )
        }
    }
    
    addToShelf(){
        this.props.addToShelf({
            variables:{
                author: this.props.authors[0],
                title: this.props.title,
                genre: this.props.genre[0],
                imageUrl: this.props.imageUrl
            },
            opts: {
                name: mutation
            },
            refetchQueries: [{query}]
        })
        .then(()=>{
            console.log("here");
            this.setState({added:true})
        })
        .catch(err=>{
            console.log(err);
        })
    }
    addToList(){
        this.props.addToList({
            variables:{
                author: this.props.authors[0],
                title: this.props.title,
                genre: this.props.genre[0],
                imageUrl: this.props.imageUrl
            },
            opts: {
                mutation:AddToList
            },
            refetchQueries:[{query}]
        })
        .then(()=>{
            console.log(this.props)
            this.setState({addedList:true})
        })
        .catch(err=>{
            console.log("ERROR HERE FUCK FUCK")
            console.log(err);
        })
       
    }
    render(){
        return(
            <div className="column">
            <div className="ui card">
                <div className="image">
                    <img src={this.props.imageUrl}></img>
                </div>                
                <div className="content">
                    <a className="bookTitleResult">{this.props.title}</a>
                    <div className="description">
                    {this.props.authors!==undefined ? this.props.authors.join(", "): 'Unkown authors'}
                    </div>
                    <br/>
                    
                    {this.renderAddedShelf()}
                    <br/>
                    {this.renderAddedList()}
                    <br/>
                    <br/>
                    <Accordion item={{
                        title: "see Description",
                        content: this.props.description
                    }} />

                </div>

                </div>
            </div>
        )
    }
}

export default compose(
    graphql(AddToList, {name:"addToList"}),
    graphql(mutation, {name: "addToShelf"})
    )(BookResult);