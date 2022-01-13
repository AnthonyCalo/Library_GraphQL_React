import React from 'react';
import "./bookDetail.css";
class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            term: ""
        };
        
    }
    componentDidMount(){
        console.log(this.props);
    }
    
    changeHandler=(event)=>{
        this.setState({term: event.target.value})
    }
    
    handleSumbit=event=>{
        event.preventDefault();
        //passing this.state.term from child(searchbar) to parent (app.js)
        this.props.onSubmit(this.state.term);

    };


    render(){
        return(
            <div className='searchBar'>
                <form className='searchForm' onSubmit={this.handleSumbit}>
                        <input type="text" className="searchInput" value={this.state.term} onChange={this.changeHandler} autoFocus></input>
                </form>
            </div>
            );
    }
}

export default SearchBar;