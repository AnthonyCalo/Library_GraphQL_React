import React, {component} from 'react';
import Header from "./components/Header"
import HomePage from './components/HomePage';
class App extends React.Component{
    render(){
        if(this.props.location.pathname=="/"){
            return ( 
                <div>
                    <Header />
                    <HomePage />
                </div>
            )
        }else{
            return ( 
                <div>
                    <Header />
                    {this.props.children}
                </div>
            )
        }

    }
}
export default App;