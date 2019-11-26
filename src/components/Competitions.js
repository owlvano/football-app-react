import React from 'react';
import jsonData from '../data/mockData.json';
const loadData = () => JSON.parse(JSON.stringify(jsonData));

export class CompetitionsContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <CompetitionsList competitions={loadData().competitions}/>;
    }
}

const CompetitionsList = props => {
    const competitions = props.competitions;
    const listItems = competitions.map(
        (competition, i) => <CompetitionRow key={i} competition={competition} />
    );
    return (
        <div id="content">
            <h1>Competitions</h1>
            <ul>{listItems}</ul>
        </div>
    );
} 

const CompetitionRow = props => {
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
