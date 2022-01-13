import React from 'react';
import DeleteBook from '../mutations/DeleteBook';
import { graphql, compose } from 'react-apollo';

import query from '../queries/GetUserList';
import AddToShelf from '../mutations/AddToShelf';


class ListBook extends React.Component {
    constructor(props){
        super(props);
        this.state={addedList:false}
    } 
    onDeleteBook(id){
        this.props.deleteBook({
            variables: {id},
            refetchQueries:[{query}]
        })
            
    }
    addToShelf(){
        this.props.addToShelf({
            variables:{
                author: this.props.book.author,
                title: this.props.book.title,
                genre: this.props.book.genre,
                imageUrl: this.props.book.imageUrl
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
    render(){
    return (
            <div className="ui card">
                <img src={this.props.book.imageUrl} alt={this.props.book.title}></img>
                <br/>
                <div className="content">
                    <h6 className="bookTitleResult"> &#9;{this.props.book.title}</h6>
                    <h7 className="authors">{this.props.book.author}</h7>

                    <br/>
                    <br/>

                    <div>
                    {this.renderAddedShelf()}
                    <br/>
                    <a onClick={()=>this.onDeleteBook(this.props.book.id)} className="deleteClick">- Delete Book</a>
                </div>
                    
                </div>
            </div>)
    }
}

export default compose(
    graphql(DeleteBook, {name:"deleteBook"}),
    graphql(AddToShelf, {name:"addToShelf"}))(ListBook);