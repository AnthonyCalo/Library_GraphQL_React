import React from 'react';

class Accordion extends React.Component{
    constructor(props){
        super(props);
        this.state={active: false}
    }
    onTitleClick(){
        this.setState({active:!this.state.active});
    }
    renderItems(){
        if(this.state.active){
            console.log(this.props.item)
            return( 
            <div>
                <div
                className="accordion_title"
                onClick={this.onTitleClick.bind(this)}
                >
                    Hide Description &nbsp;
                    <i className="icon arrow up"></i>

                </div>

                <div className="accordion_content">
                    <p>{this.props.item.content}</p>
                </div>
            </div>
            )
        }else{
            return ( 
                <div
                    className="accordion_title "
                    onClick={this.onTitleClick.bind(this)}
                >
                    See Description &nbsp;
                    <i className="icon arrow down"></i>

                </div>
            )
        }
    }
    render(){
        return (
            <div className="accordion">
            {this.renderItems()}
            </div>
            )
    }


}

export default Accordion;




