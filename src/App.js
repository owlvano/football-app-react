import React from 'react';
import { CompetitionsContainer, MatchesContainer } from './components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export const App = () => (
    <Router>
        <div id="container"> 
            <Switch>
                <Route exact path="/" component={CompetitionsContainer}/>
                <Route exact path="/competitions/:id/matches" component={MatchesContainer}/>
            </Switch>
        </div>
    </Router>
);
