import axios from 'axios';

export const getAllUser = async () => {
    return await axios
    .get('/api/user/getAllUsers')
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.error(err);
    })
}

export const upImageView = async imgID => {
    return await axios
    .post('/api/images/upImageView',{imgID})
}

export const register = async newUser => {
    return await axios
    .post('/api/user/register', {
        ID : newUser.ID,
        PASSWORD : newUser.PASSWORD,
        email : newUser.email,
        nickname : newUser.nickname,
    })
    .then(res => {
        console.log("Registered")
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}