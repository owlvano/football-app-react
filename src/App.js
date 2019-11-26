import React from 'react';
import { CompetitionsContainer } from './components/Competitions';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export const App = () => (
    <Router>
        <div id="container"> 
            <Switch>
                <Route exact path="/" component={CompetitionsContainer}/>
            </Switch>
        </div>
    </Router>
);
