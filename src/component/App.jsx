import React from "react";
import Signup from "./Signup.jsx";
import Header from "./Header.jsx";
import Signin from "./Signin.jsx"
import Home from "./Home.jsx";

class App extends React.Component {
    constructor(props) {
        super(props);
        
    }

    handleChange = () => {

    }

    render() {
        return (
            <>
                <Header />
                <Home />
            </>
        )
    }
}

export default App;