import React from 'react';
import {graphql} from 'react-apollo';
import GetUserBooks from '../queries/GetUserBooks';
import "./Shelf.css"
import ShelfBook from './ShelfBook';

class BookShelf extends React.Component{

    renderBooks(){
        if(!this.props.data.user){
            return(<div>loading</div>)
        }else{
            let books=this.props.data.user.bookShelf.map(book=>{
                return( 
                    <ShelfBook book={book} />
                )
            })
        return(books);

        }

    }
    render(){
        return (
            <div>
                    <br/>
                <div className="resultsDiv shelfDiv">
                    {this.renderBooks()}
                </div>
            </div>
            )
    }
}

export default graphql(GetUserBooks)(BookShelf)