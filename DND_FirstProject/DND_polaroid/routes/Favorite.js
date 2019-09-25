const express = require('express');
const Favorite = express.Router();
const Sequelize = require('sequelize');
const favoriteFolder = require('../models/favoriteFolder');
const favorite = require('../models/favorite');
const db = require('../database/db');

Favorite.post('/', (req, res) => { // 폴더 정보 모두 가져오기
    const ID = req.body.userID;
    favoriteFolder.findAll({
        where : {
            ID
        }
    })
    .then(folder => {
        res.json(folder);
    })
})

Favorite.post('/addFolder', (req, res) => { // 코인 충전 했을 때 코인을 충전한 금액의 /100 만큼 충전.
    const ID = req.body.info.ID;
    const favFolderName = req.body.info.folderName;
    const temp = {
        ID,
        favFolderName
    }
    favoriteFolder.create({
       ID : temp.ID,
       favFolderName : temp.favFolderName
    })
    .then(folder => {
        res.json(folder);
    })
})

Favorite.post('/addPhotoInFolder', (req, res) => { // 폴더에 포토를 넣는것.
    const favFolderNum = req.body.info.folderNum;
    const imgID = req.body.info.imgID;
    favorite.create({
        favFolderNum,
        imgID
    })
})

Favorite.post('/getAll',(req, res) => { // 모든 폴더와 그 폴더네임, url 들을 가져오는 함수.
    const { userID } = req.body
    let query = `
    SELECT a.favFolderNum, a.favFolderName, b.imgID, c.imgName, c.imgUrl FROM favoriteFolders a LEFT join favorites b ON a.favFolderNum = b.favFolderNum 
LEFT JOIN images c ON b.imgID = c.imgID  WHERE a.ID = "${userID}" ORDER BY favFolderNum`;
    db.sequelize.query(query).then(([results, metadata]) => {
        res.send(results)
    })
})


Favorite.post('/delFavFolder', (req, res) => {  // 즐겨찾기 폴더를 삭제하는 함수
    const { favFolderNum } = req.body;
    favoriteFolder.destroy({
        where : {
            favFolderNum
        }
    })
})

Favorite.post('/delFavorite', (req, res) => { // 즐겨찾기한 이미지를 삭제 하는 함수.
    const { favFolderNum, imgID }  = req.body;
    favorite.destroy({
        where: {
            favFolderNum,
            imgID
        }
    })
    .then(_=>{
        res.send("삭제 성공!");
    })
    .catch(err => {
        console.log(err);
    })
})

Favorite.post('/isFav', (req, res) => { // 해당 유저한테 해당 이미지가 즐겨찾기 된 이미지인지 아닌지 알기 위한 함수.
    const { userID, imgID } = req.body;
    let query = `SELECT * FROM favorites WHERE favFolderNum IN (SELECT favFolderNum FROM favoriteFolders WHERE ID = "${userID}") AND ImgID = ${imgID};`
    db.sequelize.query(query).then(([results, metadata]) => {  // 결과가 없으면 false 반환, 있으면 true 반환
        if(results[0] === undefined){ // 결과가 없으면 [] 이 나와서 그 배열의 [0]이 없으면으로 설정했음
            res.send(false);
        }
        else {  // 첫번째 배열이 있으면 true
            res.send(true);
        }
    })
})

module.exports = Favorite;