import React from "react";
import Signup from "./Signup.jsx";
import Header from "./Header.jsx";
import Signin from "./Signin.jsx"
import Home from "./Home.jsx";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        
    }

    handleChange = () => {

    }

    render() {
        return (
            <Switch>
                <Route path="/" component={Home} exact/>
                
                <Route path="/register" component={Signup} />
                <Route path="/signin" component={Signin} />
            </Switch>
        )
    }
}

export default App;