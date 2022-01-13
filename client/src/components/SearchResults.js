import React from 'react';
import SearchBar from './SearchBar';
import BookResult from './BookResult';

class SearchResult extends React.Component{
    renderBooks(){
        let showBooks = this.props.results.map(result=>{
            if (result.volumeInfo.imageLinks){
                return ( 
                    <BookResult 
                        imageUrl={result.volumeInfo.imageLinks.thumbnail}
                        title={result.volumeInfo.title}
                        description={result.volumeInfo.description}
                        authors={result.volumeInfo.authors}
                        genre={result.volumeInfo.categories}
                        description={result.volumeInfo.description}
                        link={result.volumeInfo.previewLink}
                        />
                )
            }else{
                return( <div></div>)
            }
            
        })
        return showBooks;
    }
    render(){
        return( 
            <div>
                <h2 className="resultsH2">Search Results Here</h2>
                <div className="shelfDiv resultsDiv">
                    {this.renderBooks()}
                </div>
            </div>
        )
    }
}

export default SearchResult;