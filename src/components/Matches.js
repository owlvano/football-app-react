import React from 'react';
import Moment from 'react-moment';
import { getMatchesData, WINNER } from '../data/footballApi';
import { ErrorComponent, LoadingComponent } from '../components';


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
    const fullTime = match.score.fullTime;
    const isScoreVisible = fullTime
                           && fullTime.homeTeam !== null 
                           && fullTime.awayTeam !== null;
    return (
        <li>
            <ul>
                <li id="title">{ match.homeTeam.name } vs. { match.awayTeam.name }</li>
                { match.score &&
                    <div>
                        { isScoreVisible &&
                            <li>Score: { fullTime.homeTeam } - { fullTime.awayTeam }</li>
                        }
                        <li>Winner: { MatchWinner(match) }</li>
                    </div>
                }
                <li>Date: <Moment parse="YYYY-MM-DDTHH:mmZ" format="DD/MM/YYYY" date={match.utcDate} /></li>
            </ul>
        </li>
    );
}

const MatchWinner = (match) => {
    const winner = match.score.winner;
    switch(winner) { 
        case WINNER.homeTeam:  return match.homeTeam.name;
        case WINNER.awayTeam: return match.awayTeam.name;
        case WINNER.draw: return 'Draw';
        default: return 'Undetermined';
    }
}
