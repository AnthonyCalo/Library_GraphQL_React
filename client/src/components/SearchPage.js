import React, {useState} from 'react';
import SearchBar from './SearchBar';
import GoogleBooks from '../apis/GoogleBooks';
import axios from 'axios';
import SearchResults from "./SearchResults";

class SearchPage extends React.Component{
    constructor(props){
        super(props);
        this.state={searchResults:[], term: "", showMore:false}
    }
    onSubmit=async(term)=>{
        this.setState({term: term})
        const response = await axios.get("https://www.googleapis.com/books/v1/volumes?",{
            params: { 
                q: term,
                maxResults: 20
            }
        });
        console.log(response.data.items[0]);
        this.setState({searchResults: response.data.items, showMore: true});
      }
    more=async()=>{
        const response = await axios.get("https://www.googleapis.com/books/v1/volumes?",{
            params: { 
                q: this.state.term,
                maxResults: 40
            }
        });
        this.setState({searchResults: response.data.items, showMore: false});
      }
    renderMore(){
        if(this.state.showMore){
            return ( 
                <a onClick={this.more} className="moreButton">More results<i className="icon arrow down alternate circle"></i></a>
            )
        }else{
            return
        }
    }
    render(){
        return ( 
            <div>
                <SearchBar onSubmit={this.onSubmit} />
                <SearchResults results={this.state.searchResults}/>
                <br/>
                {this.renderMore()}
            </div>
        )
    }
    
}

export default SearchPage;

