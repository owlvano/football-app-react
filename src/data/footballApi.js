import axios  from 'axios';

const API_URL = "http://api.football-data.org/v2/";
const HEADERS = {
    'X-Auth-Token': '039441a2aed54418a0a05234a1648399'
};
const COMPETITION_IDS = [2000, 2001, 2002, 2003, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2021];
export const WINNER = {
    awayTeam: "AWAY_TEAM",
    draw: "DRAW",
    homeTeam: "HOME_TEAM",
};

export const getCompetitions = () =>  
    axios.get(API_URL + "competitions/", { headers: HEADERS })
    .then(response => response.data.competitions)
    .then(competitions => competitions.filter(competition => COMPETITION_IDS.includes(competition.id)));

export const getMatchesData = (id) =>  
    axios.get(API_URL + `competitions/${id}/matches`, { headers: HEADERS })
    .then(response => response.data);
