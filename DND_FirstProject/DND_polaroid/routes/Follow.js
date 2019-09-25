const express = require("express");
const Follow = express.Router();
const Sequelize = require("sequelize");
const follow = require("../models/follow");
const User = require("../models/User");

Follow.post("/addFollow", (req, res) => {
  // 팔로우들 info 객체 안에 받아서 데이터베이스에 넣음.
  const followID = req.body.info.followID;
  const followerID = req.body.info.followerID;
  follow
    .create({
      followID,
      followerID
    })
    .then(user => {
      User.update(
        {
          // 내가 팔로우를 한다. 기탁이가 팔로우를 당한다. 나 : 팔로우id, 기탁: 팔로워id,
          // 내가 팔로우를 하면 팔로우 1개 늘어나야한다. , 기탁이는 팔로워가 1개 늘어난다.
          // 내가 팔로우를 당하면 내가 팔로워 1개 늘어나고, 기탁이 팔로우가 1개 늘어난다.
          follow: Sequelize.literal("follow +" + 1)
        },
        {
          where: {
            ID: followID
          }
        }
      );
      User.update(
        {
          follower: Sequelize.literal("follower +" + 1)
        },
        {
          where: {
            ID: followerID
          }
        }
      );
      res.json(user);
    });
});

Follow.post("/getOneFollow", (req, res) => {
  const followerID = req.body.followerID;
  const followID = req.body.followID;

  follow
    .findOne({
      where: {
        followerID,
        followID
      }
    })
    .then(follow => {
      res.json(follow);
    });
});

// 팔로우 너  팔로워 나
Follow.post("/getFollow", (req, res) => {
  const followID = req.body.followID;
  follow
    .findAll({
      where: {
        followID
      }
    })
    .then(follow => {
      res.json(follow);
    });
});

Follow.post("/getMyFollow", (req, res) => {
  const followerID = req.body.followerID;

  follow
    .findAll({
      where: {
        followerID
      }
    })
    .then(follow => {
      res.json(follow);
    });
});

Follow.post("/deleteFollow", (req, res) => {
  const followID = req.body.followID;
  const followerID = req.body.followerID;
  User.update(
    {
      // 팔로우 취소하면 내려가야한다.
      follow: Sequelize.literal("follow -" + 1)
    },
    {
      where: {
        ID: followID
      }
    }
  );
  User.update(
    {
      follower: Sequelize.literal("follower -" + 1)
    },
    {
      where: {
        ID: followerID
      }
    }
  );
  follow.destroy({
    where: {
      followID,
      followerID
    }
  }).then(_=>{
      res.send("삭제 성공!");
  })
  .catch(err => {
      console.log(err);
  })
});

Follow.post("/getFollowLimit", (req, res) => {
  const followID = req.body.followID;
  const start = parseInt(req.body.start);
  const count = parseInt(req.body.count);
  follow
    .findAll({
      where: {
        followID
      },limit:[start, count]
    })
    .then(follow => {
      res.json(follow);
    });
});

Follow.post("/getMyFollowLimit", (req, res) => {
  const followerID = req.body.followerID;
  const start = parseInt(req.body.start);
  const count = parseInt(req.body.count);
  follow
    .findAll({
      where: {
        followerID
      },limit:[start, count]
    })
    .then(follow => {
      res.json(follow);
    });
});

module.exports = Follow;
