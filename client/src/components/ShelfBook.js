import React from 'react';
import DeleteBook from '../mutations/DeleteBook';
import {graphql} from 'react-apollo';
import query from '../queries/GetUserBooks';


class ShelfBook extends React.Component {
    constructor(props){
        super(props)
    } 
    onDeleteBook(id){
        this.props.mutate({
            variables: {id},
            refetchQueries:[{query}]
        })
            
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
                    <a className="shelfParam" href={`#/book/${this.props.book.id}`}>Review/ Notes</a>
                    <br/>
                    <br/>
                    <a onClick={()=>this.onDeleteBook(this.props.book.id)} className="deleteClick">- Delete Book</a>
                </div>
            </div>)
    }
}

export default graphql(DeleteBook)(ShelfBook);