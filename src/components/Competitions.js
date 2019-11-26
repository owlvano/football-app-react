import React from 'react';
import { ErrorComponent } from './Error';
import { getCompetitions } from '../data/footballApi';


export class CompetitionsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            competitions: [],
        }
    }

    componentDidMount() {
        getCompetitions()
        .then(
            (competitions) => {
                console.log(competitions);
                this.setState({
                    isLoaded: true,
                    competitions: competitions
                });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    render() {
        const { error, isLoaded, competitions } = this.state;
        if (error) {
            return <ErrorComponent error={error} />;
        } else if (!isLoaded) {
            return <div id="content"><h1>Loading...</h1></div>;
        } else {
            return (
                <div id="content">
                    <h1>Competitions</h1>
                    <CompetitionsList competitions={competitions}/>
                </div>
            );
        }
    }
}

const CompetitionsList = props => {
    const competitions = props.competitions;
    const listItems = competitions.map(
        (competition, i) => <CompetitionItem key={i} competition={competition} />
    );
    return <ul>{listItems}</ul>;
} 

const CompetitionItem = props => {
    const competition = props.competition;
    return (
        <li>
            <a className="title">{ competition.name }</a>
            <ul>
                { competition.area &&
                    <li>Area: { competition.area.name }</li>
                }
                    
                { competition.currentSeason &&
                    <li>From { competition.currentSeason.startDate } to { competition.currentSeason.endDate } </li>
                }
            </ul>
        </li>
    );
}
