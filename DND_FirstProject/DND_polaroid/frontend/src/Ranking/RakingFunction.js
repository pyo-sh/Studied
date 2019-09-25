import axios from 'axios';

export const getRanking = async () => {
    return await axios
    .get('/api/ranking')
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.error(err);
    })
}

export const getLikeWeekRanking = async () => {
    return await axios
    .get('/api/likeranking/week')
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.error(err);
    })
}
export const getLikeMonthRanking = async () => {
    return await axios
    .get('/api/likeranking/month')
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.error(err);
    })
}

export const getLikeDailyRanking = async () => {
    return await axios
    .get('/api/likeranking/daily')
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.error(err);
    })
}