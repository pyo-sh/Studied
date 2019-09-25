const express = require('express');
const Film = express.Router();
const Sequelize = require('sequelize');
const User = require('../models/User');
const filmUseList = require('../models/filmUseList');
const db = require("../database/db");

Film.get('/:userID', (req, res) => {
    const id = req.params.userID;
    User.findOne({
        where : {
            ID :id
        }
    })
    .then(user => {
        res.json(user.film);
    })
})

Film.post("/charge", (req, res) => {  // 충전할 때 충전 되고 내역에도 들어가게 함.
  // 코인 충전 했을 때 코인을 충전한 금액의 /100 만큼 충전.
  const ID = req.body.info.ID;
  const chargeFilm = req.body.info.num;
  User.update(
    {
      film: Sequelize.literal("film +" + chargeFilm)
    },
    {
      where: {
        ID
      }
    }
  );
  filmUseList.create({
    userID: ID,
    filmQnty: chargeFilm,
    useType: "charge"
  });
});

Film.post("/minus", (req, res) => { // 썼을 때 감소하고 내역에도 들어가게함
  const ID = req.body.info.ID;
  const filmNum = req.body.info.filmNum;
  User.update(
    {
      film: Sequelize.literal("film -" + filmNum)
    },
    {
      where: {
        ID
      }
    }
  );
  filmUseList.create({
    userID: ID,
    filmQnty: filmNum,
    useType: "use"
  });
});

Film.post('/getAllfilmList', (req, res) => {
    const { userID } = req.body;
    
    let query = `
    SELECT useFilm, chargeFilm, chargeMonth Month FROM
    (SELECT SUM(filmQnty) useFilm, SUBSTRING(useDate,1,7) useMonth FROM filmUseLists WHERE userID = "${userID}" AND useType = "use" GROUP BY SUBSTRING(useDate,1,7)) a RIGHT OUTER JOIN
    (SELECT SUM(filmQnty) chargeFilm, SUBSTRING(useDate,1,7) chargeMonth FROM filmUseLists WHERE userID = "${userID}" AND useType = "charge" GROUP BY SUBSTRING(useDate,1,7)) b
    ON useMonth = chargeMonth UNION SELECT useFilm, chargeFilm, useMonth month FROM
    (SELECT SUM(filmQnty) useFilm, SUBSTRING(useDate,1,7) useMonth FROM filmUseLists WHERE userID = "${userID}" AND useType = "use" GROUP BY SUBSTRING(useDate,1,7)) a LEFT OUTER JOIN
    (SELECT SUM(filmQnty) chargeFilm, SUBSTRING(useDate,1,7) chargeMonth FROM filmUseLists WHERE userID = "${userID}" AND useType = "charge" GROUP BY SUBSTRING(useDate,1,7)) b
    ON useMonth = chargeMonth ORDER BY month;
    `;
    db.sequelize.query(query).then(([results, metadata]) =>{
        res.send(results);
    })
})

module.exports = Film;