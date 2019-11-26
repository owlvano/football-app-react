import axios  from 'axios';
import { HEADERS } from './headers';

const apiUrl = "http://api.football-data.org/v2/";

export const getCompetitions = () =>  
    axios.get(apiUrl + "competitions/", { headers: HEADERS })
    .then(response => response.data);

