import React from 'react';
import {graphql} from 'react-apollo';
import GetUserList from '../queries/GetUserList';
import "./Shelf.css"
import ListBook from './ListBook';

class ReadingList extends React.Component{
    componentDidMount(){
        this.props.data.refetch();
        console.log("here refetching");
    }
    renderBooks(){
        if(!this.props.data.user){
            return(<div>loading</div>)
        }else{
            let books=this.props.data.user.readingList.map(book=>{
                return( 
                    <ListBook book={book} />
                )
            })
        return(books);

        }

    }
    render(){
        return (
            <div>
                <h1>Reading List</h1>
                    <hr />
                    <br/>
                <div className="resultsDiv shelfDiv">
                    {this.renderBooks()}
                </div>
            </div>
            )
    }
}

export default graphql(GetUserList)(ReadingList)