import React, { Component } from 'react';
import Header from '../components/header/Header';
import Feed from './feed/Feed';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Question from './question/Question';

export default class App extends Component{
    render = () => 
        <div className="container"> 
            <Header />
            <Router>
                {/* Switch renders the first child of Router that matches the url */}
                <Switch>
                    {/* <Route path ='/' component={Feed} />  */}
                    {/* <Route exact path='/feed' component={Feed} /> */}
                    <Route exact path='/' component={Feed} />
                    <Route path='/questions/:id' component={Question} />
                    <Route path='/questions' component={Feed} />
                </Switch>
            </Router>
        </div>
}