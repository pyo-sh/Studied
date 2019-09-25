import axios from 'axios';

export const register = async newUser => {
    return await axios
    .post('/api/user/register', {
        ID : newUser.ID,
        PASSWORD : newUser.PASSWORD,
        email : newUser.email,
        nickname : newUser.nickname,
    })
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}
export const localLogin = async user => {
    return await axios
    .post('/api/user/login', {
        ID: user.ID,
        PASSWORD : user.PASSWORD
    })
    .then(res => {
        localStorage.setItem('usertoken', res.data.token)
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}

export const sessionLogin = async user => {
    return await axios
    .post('/api/user/login', {
        ID: user.ID,
        PASSWORD : user.PASSWORD
    })
    .then(res => {
        sessionStorage.setItem('usertoken', res.data.token)
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}

export const deleteUser = async userID => {
    return await axios 
    .delete(`/api/user/delete/${userID}`)
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err);
    })
}

export const findPassword = async user => {
    return await axios
    .post('/api/user/findpassword', {
        ID : user.ID,
        email : user.email
    })
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err);
    })
}

export const ResetPwd = async user => {
    return await axios
    .post('/api/user/reset', {
        ID: user.userID,
        PASSWORD : user.PASSWORD
    })
    .then(res => {
        console.log(res);
        return res;
    })
    .catch(err => {
        console.log(err);
    })
}

export const findId = async email => {
    return await axios
    .post('/api/user/findid',{
        email : email
    })
    .then(res => {
        console.log(res);
        return res;
    })
    .catch(err => {
        console.log(err);
    })
}