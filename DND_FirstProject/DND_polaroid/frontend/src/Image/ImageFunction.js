import axios from 'axios';

export const getFilm = async userID => {
    return await axios
    .get(`/api/film/${userID}`)
    .then(res => {
        // 잘 되는지 확인하기 위한 console.log
        // console.log("가지고온다~")
        // console.log(res);
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}

export const minusFilm = async info => {
    return await axios
    .post('/api/film/minus', {
        info
    })
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}

export const getFolder = async userID => {
    return await axios
    .post('/api/favorite', {
        userID
    })
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}

export const addFolder = async info => {
    return await axios
    .post('/api/favorite/addFolder', {
        info
    })
    .then(res => {
        return res;
    })
}

export const addPhotoInFolder = async info => {
    return await axios
    .post('/api/favorite/addPhotoInFolder', {
        info
    })
    .then(res => {
        return res;
    })
}

export const getImageInfo = async imgID => {
    return await axios
    .get(`/api/images/getOneImg/${imgID}`)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.error(err);
    })
}

export const getDownCount = async imgID => { //다운 카운트 가져오는거
    return await axios
    .get(`/api/images/getDownloads/${imgID}`)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.error(err);
    })
}


export const plusDownUser = async (imgID, userID, price) => { // 다운수 증가
    return await axios
    .post(`/api/images/plusDownUser`,{
        imgID,
        userID,
        price
    })
}

export const isDownImage = async (imgID, userID ) => {
    return await axios
    .post('/api/images/isDownImage', {
        imgID, userID
    })
    .then(res => {
        return res.data
    })
    .catch(err => {
        console.error(err);
    })
}

// 다운 수 감소 어디감? 다운수를 감소 시킬수가 있나? 다운 취소..?

export const getLikeCount = async imgID => { // imgID로 img의 좋아요 개수를 가지고옴
    return await axios
    .get(`/api/imglike/getlike/${imgID}`)
    .then(res=> {
        return res;
    })
    .catch(err => {
        console.error(err);
    })
}

export const isGetLike = async (imgID, userID) => { // imgID 와 userID로 자신이 이 이미지를 좋아요를 눌렸는지 아닌지를 파악
    return await axios
    .post('/api/imglike/isGetLike', {imgID, userID})
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.error(err);
    })
}

export const imgLikeUp = async (imgID, userID) => { // 이미지의 라이크 수를 높이기 위한 함수
    return await axios
    .post('/api/imglike/likeup',{imgID, userID})
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    })
}

export const imgLikeDown = async (imgID, userID ) => { // 이미지의 라이크 수를 감소 시키기 위한 함수
    return await axios
    .post('/api/imglike/likedown', {imgID, userID})
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    })
} 

export const isFav = async (imgID, userID) => { //즐겨찾기 한 이미지인지 아닌지 확인하기 위한 함수
    return await axios
    .post('/api/favorite/isFav', {imgID, userID})
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.error(err);
    })
} 

export const delFavFolder = async favFolderNum => { // 폴더를 삭제 시키기 위함.
    return await axios
    .post('/api/favorite/delFavFolder', {favFolderNum})
}

export const delMyImg = async imgID => {
    return await axios
    .post('/api/images/delmyimg', {imgID})
}
