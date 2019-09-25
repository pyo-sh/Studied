import axios from 'axios';

export const chargeFilm = async (info) => {
    return await axios
    .post('/api/film/charge',{
        info
    })
    .then(res => {
        console.log(res);
    })
}