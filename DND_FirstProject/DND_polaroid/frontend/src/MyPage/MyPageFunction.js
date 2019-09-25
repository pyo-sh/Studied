import axios from 'axios';

export const getAllInfo = async userID => {
    return await axios
    .get(`/api/mypage/${userID}`)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}

export const editMyPage = async user => {
    return await axios
    .post('/api/mypage/edit',{
        ID : user.id,
        introduce : user.about,
        nickname : user.name
    })
    .then(res => {
        return res;
    })
    .catch(err => {
        console.error(err);
    })
}

export const checkPassword = async user => {
    return await axios
    .post('/api/user/login', {
        ID: user.id,
        PASSWORD : user.password
    })
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}

export const getAllFavorite = async userID => {    //모든 폴더와 그 폴더네임, url 들을 가져오는 함수.
    return await axios
    .post('/api/favorite/getAll', {
        userID
    })
    .then(res =>{
        return res.data;
    })
}

export const getBenefitMonth = async userID => { // 작가의 모든 월별 수익들을 가지고 올꺼임
    return await axios
    .post('/api/images/getBenefitMonth', {
        userID
    })
    .then(res => {
        return res.data;
    })
    .catch(err=> {
        console.error(err);
    })
}

export const getAllFilmList = async userID => { // 모든 필름 사용 내역을 가져다줌
    return await axios
    .post('/api/film/getAllFilmList', {
        userID
    })
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.error(err);
    })
}

export const getMyDownImg = async userID => { // 유저아이디를 받아서 그 유저가 다운 받음 이미지를 다 가져오는것.
    return await axios
    .get(`/api/images/getMyDownImg/${userID}`)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.error(err);
    })
}

export const getMyLikeImg = async userID => { // 유저아이디를 받아서 그 유저가 좋아요한 이미지를 다 가져오는것.
    return await axios
    .get(`/api/imgLike/getMyLikeImg/${userID}`)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.error(err);
    })
}

export const delFavImg = async (favFolderNum, imgID) => {  // favFolderNum이랑 imgID를 매개변수로 받아서 폴더 밑의 이미지를 삭제한다.
    return await axios
    .post(`/api/favorite/delfavorite`, {favFolderNum, imgID})
    .then(res => {
        return null;
    })
}

export const getAllUploadImg = async (userID) => { // userID를 가지고 그 유저의 모든 업로드한 이미지와 url을 가지고 온다.
    return await axios
    .get(`/api/images/getUserAllUpImg/${userID}`)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.error(err);
    })
}