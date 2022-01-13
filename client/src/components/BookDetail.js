import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from "graphql-tag"
import axios from "axios";
import "./bookDetail.css";
import mutation from "../mutations/AddReview";
import {Link, hashHistory} from "react-router";


class BookDetail extends React.Component{
    constructor(props){
        super(props);
        this.state={"book":{}, "review": "", editing: false}
    }
    componentDidMount() {
        axios({
            url: "/graphql",
            method: "post",
            data: {
                query: `
                {
                    getBookDetail(id: "${this.props.params.id}"){
                        title
                        author
                        review
                        notes
                        imageUrl
                    }
                }
                `
            }
        }).then(res=>{
            console.log("here at RESPONSE")
            this.setState({"book": res.data.data.getBookDetail});
            this.setState({"review": res.data.data.getBookDetail.review});
            console.log(this.state.review);
        })
        .catch(err=>{
            console.log(err);
        })

    }
    onSubmit(event){
        event.preventDefault();
        this.props.mutate({
            variables: {
                id: this.props.params.id,
                review:this.state.review
            }
        }).then(()=>{
            hashHistory.push("/myshelf")
        })
    }
    clickBack(){
        document.getElementById("clickBack").click();
    }
    renderReview(){
        if(this.state.editing){
            return ( 
                <div className="editDiv">
                    <textarea id="myTextArea" className="textArea" value={this.state.review} onChange={e=>this.setState({review:e.target.value})}></textarea>
                        <br />
                    <div className="editBtnDiv">
                        <button id="pubButton" className="btn submitReviewBtn" type="submit" onClick={this.onSubmit.bind(this)}>Publish</button>
                        <button className="btn btn-primary" onClick={()=>this.clickBack()}>Cancel Review</button>
                    </div>
                </div>
            )
        }else{
            return ( 
                <div className="seeReviewDiv">
                    <div className="textArea">
                        <i
                            className="edit icon big right"
                            onClick={()=>this.setState({editing: true})}
                        ></i>
                        <br/>
                        {this.state.book.review}
                    </div>
                </div>
            )
        }
    }
    render(){
        return ( 
            <div className="reviewDiv">
                    <Link id="clickBack" to="/myshelf" className="back">
                        <i className="icon arrow alternate circle left"></i> Back 
                    </Link>
                    <div className="reviewImgDiv">
                        <img className="reviewImg" alt="bookReview" src={this.state.book.imageUrl}></img>
                    </div>
                    <h1>Review <span className="iTitle">{this.state.book.title}</span> by {this.state.book.author}</h1>
                    {this.renderReview()}
                   
            </div>
        )
    }
}





export default graphql(mutation)(BookDetail);