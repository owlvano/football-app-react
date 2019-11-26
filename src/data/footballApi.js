import axios  from 'axios';

const apiUrl = "http://api.football-data.org/v2/";
const HEADERS = {
    'X-Auth-Token': '039441a2aed54418a0a05234a1648399'
};

export const getCompetitions = () =>  
    axios.get(apiUrl + "competitions/", { headers: HEADERS })
    .then(response => response.data);

