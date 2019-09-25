const express = require('express');
const Ranking = express.Router();

const User = require('../models/User');

Ranking.get('/', (req, res) => {
    User.findAll({order : [['follower','DESC']], limit : 5})
    .then(user => {
        if(user === null){
            console.log('유저가 없습니다.')
        }
        else {
            const rankUser = JSON.stringify(user);
            const parseUser = JSON.parse(rankUser);
            let array = [];
            parseUser.forEach(user => {
                  const userId = user.ID;
                  const userNickname = user.nickname;
                  const userfollower = user.follower; 
                  const userProfileImg = user.profileImg;
                  const userInfo = {
                    userId,
                    userProfileImg,
                    userNickname,
                    userfollower
                  }
                  array = [...array, userInfo];
            })
            res.json(array);
        }
    })
})

module.exports = Ranking;