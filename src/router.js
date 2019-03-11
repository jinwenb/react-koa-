import React, {Component} from 'react';
import {
    BrowserRouter  as Router,
    Route,
    Switch
} from 'react-router-dom'
import Home from "./pages/home";
import Admin from "./pages/admin";

export default class RouterS extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className='app'>
                <Router>
                    <Switch>
                        <Route exact   path='/' component={Home}/>
                        <Route path='/admin' component={Admin}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}