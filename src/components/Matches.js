import React from 'react';
import { useParams } from "react-router";
import { getMatchesData } from '../data/footballApi';
import { ErrorComponent, LoadingComponent } from './Helpers';

export class MatchesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            matchesData: [],
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        getMatchesData(params.id)
        .then(
            (matchesData) => {
                this.setState({
                    isLoaded: true,
                    matchesData: matchesData
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    render() {
        const { error, isLoaded, matchesData } = this.state;
        const matches = matchesData.matches;
        return (
            <div id="content">
            {
                error ? <ErrorComponent error={error} /> :
                !isLoaded ? <LoadingComponent /> : (
                    <div>
                        <h1>Matches of the "{ matchesData.competition.name }" competition</h1>
                        <MatchesList matches={matches}/>
                    </div>
                )
            }
            </div>
        ); 

    }
}

const MatchesList = props => {
    const matches = props.matches;
    const listItems = matches.map(
        (match, i) => <MatchItem key={i} match={match} />
    );
    return <ul>{listItems}</ul>;
}

const MatchItem = props => {
    const match = props.match;
    return (
        <li>
            <ul>
                <li id="title">{ match.homeTeam.name } vs. { match.awayTeam.name }</li>
                { match.score &&
                    <div>
                        <li>Score: { match.score.fullTime.homeTeam } - { match.score.fullTime.awayTeam }</li>
                        <li>Winner: { match.score.winner }</li>
                    </div>
                }
                <li>Date: { match.utcDate }</li>
            </ul>
        </li>
    );
}