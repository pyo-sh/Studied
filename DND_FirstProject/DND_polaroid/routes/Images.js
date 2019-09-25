const express = require('express');
const Images = express.Router();
const Sequelize = require('sequelize');
const db = require("../database/db");
const image = require('../models/image');
const imgDownload = require('../models/imgDownload');

Images.get('/getAllImages', (req, res) => { // 모든 이미지
    let {start, count} = req.query;
    let query = `SELECT imgID, imgName, imgUrl from images limit ${start}, ${count} `;

    db.sequelize.query(query).then(([results, metadata]) => {
        res.json(results);
    })
})
Images.get('/getAllImagesTag', (req, res) => { // 모든 이미지를 태그와 함께
    let {start, count} = req.query;
    let query = `SELECT imgID, imgName, imgUrl, tag from images limit ${start}, ${count} `;

    db.sequelize.query(query).then(([results, metadata]) => {
        res.json(results);
    })
})

Images.get('/getAllImagesCategory', (req, res) => {  // 모든 이미지를 카테고리와 함께
    let {start, count} = req.query;
    let query = `SELECT imgID, imgName, imgUrl, tag, category from images limit ${start}, ${count} `;

    db.sequelize.query(query).then(([results, metadata]) => {
        res.json(results);
    })
})

Images.get('/getOneImg/:imgID', (req, res) => { // imgID의 정보를 가져오는것
    let { imgID } = req.params;
    image.findOne({
        where : {
            imgID
        }
    })
    .then(img => {
        res.send(img);
    })
})

Images.get('/getMyDownImg/:userID', (req, res) => { // 다운로드 받은 이미지를 가져오는 것.
    let { userID } = req.params;

    let query = `SELECT imgID, imgUrl FROM images WHERE imgID IN (SELECT imgID FROM imgDownloads WHERE userID = "${userID}")`;
    db.sequelize.query(query).then(([results, metaData]) => {
        res.send(results);
    })
    .catch(err => {
        console.error(err);
    })
})

Images.get('/getDownloads/:imgID', (req, res) => { // 다운로드 수를 가져오는것
    let { imgID } = req.params;
    
    let query = `SELECT COUNT(*) downCount FROM imgDownloads WHERE imgID = ${imgID}`;

    db.sequelize.query(query).then(([results, metadata]) => {
        res.send(results);
    })
})

Images.post('/plusDownUser', (req, res) => { // 다운받은 유저 수 올리는 것.
    const { imgID, userID, price } = req.body;
    imgDownload.findOne({
        where : {
            imgID,
            userID
        }
    }).then(result => {
        if(!result) {
            imgDownload.create({imgID, userID, filmQnty: price})
        }
    })
})

Images.post('/isDownImage', (req, res) => { // 다운 받은 이미지인가? 다운 받은 이미지면 공짜로 다시 다운 받을 수 있게 해야함.
    const { imgID, userID } = req.body;
    imgDownload.findOne({
        where:{
            imgID,
            userID,
        }
    })
    .then(result => { // 만약 다운 받은 적이 없으면 false 받은적이 있으면 true을 보냄.
        if(!result){
            res.send(false);
        }
        else {
            res.send(true);
        }
    })
})

Images.post('/getBenefitMonth', (req, res) => { // 달별 수익을 보는 것.
    const { userID } = req.body;
    let query = `
    SELECT imgCount, downCount, sumFilm, uploadMonth Month FROM 
    (SELECT COUNT(*) imgCount, SUBSTRING(uploadDate,1,7) uploadMonth FROM images WHERE userID = "${userID}" GROUP BY SUBSTRING(uploadDate,1,7)) c 
    LEFT JOIN
    (SELECT COUNT(*) downCount, SUM(filmQnty) sumFilm, SUBSTRING(downDate,1,7) beneMonth FROM imgDownloads a, images b WHERE b.userID = "${userID}" 
    AND a.imgID = b.imgID GROUP BY SUBSTRING(downDate,1,7)) d ON uploadMonth = beneMonth`;

    db.sequelize.query(query).then(([results, metaData]) => {
        res.send(results);
    })
})


Images.get('/getAllImagesUser', (req, res) => { // 모든 이미지 아이디와 url과 유저 아이디를 start 부터 count까지
    let {start, count} = req.query;
    let query = `SELECT imgID, imgUrl, userID from images limit ${start}, ${count} `;

    db.sequelize.query(query).then(([results, metadata]) => {
        res.json(results);
    })
})
Images.post('/upImageView', (req, res) => { // 이미지 뷰 수를 올리는 것
    const { imgID }= req.body;

    image.update({
        view : Sequelize.literal('view +' + 1)
    },{
        where : {
            imgID
        }
    })
})

Images.post('/delmyimg', (req , res) => { // 나의 이미지를 지우는 것.
    const { imgID } = req.body;

    image.destroy({
        where : {
            imgID
        }
    })
});

Images.get('/getUserUpImg/:userID', (req, res) => { // 유저아이디를 받아서 그 유저가 업로드한 최근 사진 아이디와 url을 받아옴(3개)
    const { userID } = req.params;
    let query = `SELECT imgID, imgUrl FROM images WHERE userID = "${userID}" ORDER BY uploadDate desc LIMIT 3;`
    db.sequelize.query(query).then(([results, metaData]) => {
        res.send(results);
    })
})

Images.get('/getUserAllUpImg/:userID', (req, res) => { // 유저아이디를 받아서 그 유저가 업로드한 사진 아이디와 url을 전부가져옴
    const { userID } = req.params;
    let query = `SELECT imgID, imgUrl FROM images WHERE userID = "${userID}";`
    db.sequelize.query(query).then(([results, metaData]) => {
        res.send(results);
    })
})

module.exports = Images;