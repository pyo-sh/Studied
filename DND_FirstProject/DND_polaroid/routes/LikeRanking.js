const express = require("express");
const LikeRanking = express.Router();
const Sequelize = require("sequelize");
const imgLiked = require("../models/imgLiked");
const image = require("../models/image");
const db = require("../database/db");

LikeRanking.get("/all", (req, res) => {
  // 전체 좋아요 랭킹을 순서대로 보여줌. imgID 컬럼이랑 COUNT(*) 컬럼을 count로 해서.
  // imgID 별로 그룹을 지어서 count 수 내림차순으로 정렬을 해서 limit 5 만큼.
  let query =
    "SELECT a.imgID , imgName, COUNT(*) count FROM images a, imgLikeds b WHERE a.imgID = b.imgID GROUP BY imgID ORDER BY COUNT(*) desc";
  // 시퀄라이즈로 하기가 어려워서 query를 직접 짜서 해보았다. imgID 같은 애들끼리 INNER JOIN 해서 그룹바이 imgID 해서
  // imgID와 imgName과 그것들의 개수를 출력한다.
  db.sequelize.query(query).then(([results, metadata]) => {
    // count 순서대로 출력. 랭킹 매길때 사용.
    res.send(results);
  });
});

LikeRanking.get("/month", (req, res) => {
  // 현재 달의 랭킹을 조회한다.  // url 포함
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let query = `SELECT a.imgID , b.imgName, b.imgUrl, b.userID, COUNT(*) AS count, SUBSTRING(likeDate, 1,7) AS month FROM imgLikeds a, images b
  WHERE  a.imgID = b.imgID  and SUBSTRING(likeDate,1,7) = "${year}-${month}" GROUP BY imgID ORDER BY COUNT(*) DESC, imgName LIMIT 5;`;

  db.sequelize.query(query).then(([results, metadata]) => {
    // count 순서대로 출력. 랭킹 매길때 사용.
    res.send(results);
  });
  // imgLiked
  //   .findAll({
  //     attributes:['imgID', [Sequelize.fn('COUNT', '*'), 'count'], [Sequelize.literal('substring(likeDate,6,2)'), 'month']],
  //     where : Sequelize.literal(`substring(likeDate,6,2) = ${month} `),
  //     group : ['imgID',Sequelize.fn('substring', Sequelize.col('likeDate'),1,7)],
  //     order : Sequelize.literal('count(*) desc'),
  //     limit : 5,
  //   })
  //   .then(user => {
  //       res.send(user);
  //   })
});

LikeRanking.get("/week", (req, res) => {
  // 현재 주의 랭킹을 조회한다.
  // let date = new Date();
  // let date2 = new Date();
  // // console.log("겟 데이트 "+ date.getDate());  오늘 날
  // // console.log("겟 데이", + date.getDay()); 오늘이 이번주의 며칠째인지(일요일부터) 0~6까지.
  // // console.log("겟 먼스" + (date.getMonth() + 1)); 0~11까지 오늘이 무슨 달인지 그래서 +1을 해서 1~12로 만들어줌.
  // // console.log("겟 이얼" + date.getFullYear()); 오늘이 몇년도인지 4자리  ex) 2019, 2018 이런식으로 나옴
  // // console.log(date); 오늘 날 시간 같은거 다 나옴.
  // let day = (date.getDay()); // 오늘이 이번주의 몇째주인지..
  // let today = date.getDate(); // 오늘 날짜
  // let year = date.getFullYear();   // 그 날짜가 어떻게 되는지... 잘 생각해봅시당.... ㅎㅎ;;
  // let month = (date.getMonth()+1);

  // date2.setDate(date2.getDate() - day + 1);

  // let startday = (date2.getDate());  // 시작주 부터 그다음까지..
  // let startYear = date2.getFullYear();   // 그 날짜가 어떻게 되는지... 잘 생각해봅시당.... ㅎㅎ;;
  // let startMonth = (date2.getMonth()+1);

  // imgLiked
  //   .findAll({
  //     attributes:['imgID', [Sequelize.fn('COUNT', '*'), 'count'], [Sequelize.literal('substring(likeDate,1,4)'), 'year']],
  //     where : Sequelize.literal(`likeDate BETWEEN '${startYear}-${startMonth}-${startday}' and '${year}-${month}-${today}'`),
  //     group : ['imgID',Sequelize.fn('substring', Sequelize.col('likeDate'),1,7)],
  //     order : Sequelize.literal('count(*) desc'),
  //     limit : 5,
  //   })
  //   .then(user => {
  //       res.send(user);
  //   })

  let date = new Date();
  let date2 = new Date();
  // console.log("겟 데이트 "+ date.getDate());  오늘 날
  // console.log("겟 데이", + date.getDay()); 오늘이 이번주의 며칠째인지(일요일부터) 0~6까지.
  // console.log("겟 먼스" + (date.getMonth() + 1)); 0~11까지 오늘이 무슨 달인지 그래서 +1을 해서 1~12로 만들어줌.
  // console.log("겟 이얼" + date.getFullYear()); 오늘이 몇년도인지 4자리  ex) 2019, 2018 이런식으로 나옴
  // console.log(date); 오늘 날 시간 같은거 다 나옴.
  let day = date.getDay(); // 오늘이 이번주의 몇째주인지..
  let today = date.getDate(); // 오늘 날짜
  let year = date.getFullYear(); // 그 날짜가 어떻게 되는지... 잘 생각해봅시당.... ㅎㅎ;;
  let month = date.getMonth() + 1;

  date2.setDate(date2.getDate() - day + 1);

  let startday = date2.getDate(); // 시작주 부터 그다음까지..
  let startYear = date2.getFullYear(); // 그 날짜가 어떻게 되는지... 잘 생각해봅시당.... ㅎㅎ;;
  let startMonth = date2.getMonth() + 1;

  if (month < 10) {
    month = "0" + month;
  }
  if (today < 10) {
    today = "0" + today;
  }
  if (startday < 10) {
    startday = "0" + startday;
  }
  if (startMonth < 10) {
    startMonth = "0" + startMonth;
  }
  let query = `SELECT a.imgID, b.imgName, b.imgUrl, b.userID, COUNT(*) AS count FROM imgLikeds a, images b 
  WHERE a.imgID = b.imgID AND substring(likeDate,1,10) BETWEEN "${startYear}-${startMonth}-${startday}" AND "${year}-${month}-${today}" GROUP BY imgid ORDER BY COUNT(*) DESC, imgName LIMIT 5;`;

  db.sequelize.query(query).then(([results, metadata]) => {
    // count 순서대로 출력. 랭킹 매길때 사용.
    res.send(results);
  });
});

LikeRanking.get("/daily", (req, res) => {
  // 오늘을 랭킹을 조회한다.
  let date = new Date();
  const day = date.getDate();
  // imgLiked    시컬라이저로 짯다가 include 쓰면서 imgName 까지 출력할려고 하니깐 어려워서 그냥 쿼리로 출력 하려고한다.
  //   .findAll({
  //     attributes:['imgID', [Sequelize.fn('COUNT', '*'), 'count'],[Sequelize.literal('substring(likeDate,9,2)'), 'day']],
  //     where : Sequelize.literal(`substring(likeDate,9,2) = ${day} `),
  //     group : ['imgID','likeDate'],
  //     order : Sequelize.literal('count(*) desc'),
  //     limit : 5,
  //   })
  //   .then(user => {
  //       res.send(user);
  //   })
  if (day < 10) {
    day = "0" + day;
  }
  let query = `SELECT a.imgID, b.imgName, b.imgUrl, b.userID, COUNT(*) AS COUNT, SUBSTRING(likeDate,9,2) AS DAY FROM imgLikeds a, images b 
    WHERE a.imgID = b.imgID AND substring(likeDate,9,2) = ${day} GROUP BY a.imgID, likeDate order by COUNT(*) DESC LIMIT 5;`;

  db.sequelize.query(query).then(([results, metadata]) => {
    // count 순서대로 출력. 랭킹 매길때 사용.
    res.send(results);
  });
});

module.exports = LikeRanking;
