const express = require('express');
const users = express.Router();
const jwtSecret = require('../config/jwtConfig');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const favoriteFolder = require('../models/favoriteFolder');
const google = require('./google');

users.post('/fblogin', (req, res, next) => {
    passport.authenticate('facebook', (err, users, info) => {
        console.log("user, info " + users, info );
        if(err){
            console.error(`error ${err}`);
        }
        if (info !== undefined) {
            console.log(info);
            console.error(info.message);
            if (info.message === 'bad id'){
                req.status(401).send(info.message);
            } else {
                res.status(403).send(info.message);
            }
        }else {
            req.logIn(users, () => {
                User.findOne({
                    where : {
                        ID: req.body.ID,
                    }
                }).then(user => {
                    if(user){
                            let token = jwt.sign(user.dataValues, jwtSecret.secret, {
                            expiresIn: 60 * 60,
                        })
                        res.status(200).send({
                            auth: true,
                            token,
                            message: 'user found & logged in'
                        });
                    } 
                    else {
                      res.status(400).json({ error: 'User does not exist '})
                  };
                });
            });
        }
    })(req, res, next);
});

users.post('/login', (req, res, next) => {  // 로그인
    passport.authenticate('login', (err, users, info) => {
        if (err) {
            console.error(`error ${err}`);
        }
        if (info !== undefined) {
            console.log(info);
            console.error(info.message);
            if (info.message === 'bad id'){
                req.status(401).send(info.message);
            }else {
                res.status(403).send(info.message);
            }
        } else {
            req.logIn(users, () => {
                User.findOne({
                    where : {
                        ID: req.body.ID,
                    }
                }).then(user => {
                    if(user){
                        if(bcrypt.compareSync(req.body.PASSWORD, user.PASSWORD)){
                            let token = jwt.sign(user.dataValues, jwtSecret.secret, {
                                expiresIn: 60 * 60,
                        })
                        res.status(200).send({
                            auth: true,
                            token,
                            message: 'user found & logged in'
                        });
                    };
                  } else {
                      res.status(400).json({ error: 'User does not exist '})
                  };
                });
            });
        }
    })(req, res, next);
});

users.post('/register', (req, res, next) => {   // 유저 등록
    passport.authenticate('register', (err, user, info) => {
        if(err){
            console.error(err);
        }
        if (info !== undefined){
            console.error(info.message);
            res.status(403).send(info.message);
        } else {
            req.logIn(user, error => {
                const today =new Date();
                const userData = {
                    ID : req.body.ID,
                    PASSWORD: req.body.PASSWORD,
                    email : req.body.email,
                    nickname : req.body.nickname,
                    introduce : '안녕하세요 처음뵙겠습니다.',
                    follow : 0,
                    follower : 0,
                    grade : '일반',
                    film : 0,
                    created: today,
                };
                User.findOne({
                    where: {
                        ID: req.body.ID,
                    },
                }).then(user => {
                    if(!user){
                        bcrypt.hash(req.body.PASSWORD, 10, (err,hash) => {
                            userData.PASSWORD = hash;
                            User.create(userData)
                            .then(user => {
                                const userFav = {
                                    ID: user.ID,
                                    favFolderName: '기본 폴더'
                                }
                                favoriteFolder.create(userFav);
                                res.json({status : user.ID + 'registerd'})
                                })
                            .catch(err => {
                                res.send('error :' + err);
                                })
                            })
                    } else {
                         console.log('유저가 이미 있따?');
                         res.send({error: 'User already exist'})
                    }
                })
            })
        }
    })(req, res, next);
})

users.get('/finduser', (req, res, next) => {  // 유저 찾기
    passport.authenticate('jwt', { session: false}, (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info !== undefined){
            console.log(info.message);
        } else if (user.ID === req.query.username) {
            User.findOne({
                where: {
                    ID: req.query.username,
                },
            }).then((userInfo) => {
                if(userInfo !== null){
                    console.log('user found in db from findUsers');
                    res.status(200).send({
                        auth: true,
                        ID : userInfo.ID,
                        PASSWORD : userInfo.PASSWORD,
                        email : userInfo.email,
                        nickname : userInfo.nickname,
                        message: 'user found in db',
                    });
                }else {
                    console.error('no user exists in db with that username');
                    res.status(401).send('no user exists in db with that username');
                }
            })(req, res, next);
        } ;
    });
});

users.post('/reset', (req, res) => { // 패스워드 리셋
    const { ID, PASSWORD } = req.body; // id와 패스워드를 받아서 id를 찾아 패스워드를 바꿈
    User.findOne({
        where : {
            ID : ID
        }
    }).then((user) => {
        if (user == null) {
            console.error('password reset link is invalid or has expired');
            res.status(403).send('password reset link is invalid or has expired');
        } else {
            bcrypt.hash(PASSWORD, 10, (err,hash) => {
                const hashPassword = hash;
                user.update({
                    PASSWORD : hashPassword
                })
                res.status(200).send({
                    ID: user.ID,
                    message: 'password reset link a-ok',
                });
            })
        }
    })
});


users.delete('/delete/:userID', (req, res) => {
            console.log(req.params.userID);
            User.destroy({
                where : {
                    ID: req.params.userID
                },
            })
            .then((userInfo) => {
                if (userInfo === 1) {
                    console.log('user deleted from db');
                    res.status(200).send('user deleted from db');
                } else {
                    console.error('user not found in db');
                    res.status(404).send('no user with that username to delete ');
                }
            })
            .catch((error) => {
                console.error('problem communicating with db');
                res.status(500).send(error);
            })
})

users.post('/findpassword', (req, res) => { // 해당 주소로 들어왔을때만 ok하게 어떻게 하나.......
    if (req.body.ID === '') {
      res.status(400).send('ID required');
    }
    console.error(req.body.ID);
    User.findOne({
      where: {
        ID: req.body.ID,
      },
    }).then((user) => {
      if (user === null) {
        console.error('ID not in database');
        res.status(403).send('ID not in db');
      } else {
        // const token = crypto.randomBytes(20).toString('hex');
        const uservalue = {
            ID : req.body.ID,
            auth : true,
        }
        let token = jwt.sign(uservalue, jwtSecret.secret, {
            expiresIn: 60 * 60,
        })
        const transporter = nodemailer.createTransport({
         secure: false,
          service: 'gmail',
          auth: {
            user: google.user, // 바꾸자
            pass: google.pass, // 바꾸자
          },
          tls: {
            rejectUnauthorized: false
        }
        });

        const mailOptions = {
          from: 'mySqlDemoEmail@gmail.com',
          to: `${user.email}`,
          subject: 'Polaroid 비밀번호 바꾸기 시스템',
          text:
            `안녕하세요.${req.body.ID}님 Polaroid입니다. 비밀번호를 바꾸기 위해 요청을 하셨군요.\n\n`
            + '아래의 링크를 클릭하시거나 브라우저 주소창에 붙여넣기 해주세요!\n\n'
            + `http://localhost:3000/user/reset/${req.body.ID}/${token}\n`
            + '만약 패스워드를 바꾸고 싶지 않으시다면 이 링크를 무시하시면 당신의 비밀번호는 바뀌지 않을거에요!\n',
        };

        console.log('sending mail');

        transporter.sendMail(mailOptions, (err, response) => {
          if (err) {
            console.error('there was an error: ', err);
          } else {
            console.log('here is the res: ', response);
            res.status(200).json('recovery email sent');
          }
        });
      }
    });
  });
users.post("/findid", (req, res) => {
  // 해당 주소로 들어왔을때만 ok하게 어떻게 하나.......
  if (req.body.email === "") {
    res.status(400).send("email required");
  }
  console.error(req.body.email);
  User.findAll({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user === null) {
      console.error("email not in database");
      res.status(403).send("email not in db");
    } else {
      // const token = crypto.randomBytes(20).toString('hex');
      const jsonUser = JSON.stringify(user);
      const parseUser = JSON.parse(jsonUser);
      let array = []
      parseUser.forEach(user => {
            array = [...array, user.ID]
      })
      console.log(array);
      
      const transporter = nodemailer.createTransport({
        secure: false,
        service: 'gmail',
        auth: {
          user: google.user, // 바꾸자
          pass: google.pass, // 바꾸자
        },
        tls: {
          rejectUnauthorized: false
      }
      });
      const mailOptions = {
        from: "mySqlDemoEmail@gmail.com",
        to: `${req.body.email}`,
        subject: "Polaroid 아이디 찾기 시스템",
        text:
          `안녕하세요.${
            req.body.email
          }님 Polaroid입니다. 아이디를 찾기 위해 요청을 하셨군요.\n\n` +
          `고객님의 아이디는 ${array} 입니다.\n\n` + 
          "Polaroid를 이용해 주셔서 감사합니다.\n"
      };
      console.log("sending mail");
      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.error("there was an error: ", err);
        } else {
          console.log("here is the res: ", response);
          res.status(200).json("recovery email sent");
        }
      });
    }
  });
});

users.get('/getAllUsers', (req, res) => { // 모든 유저 가져오기
    User.findAll({
        attributes : ["ID"]
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        console.error(err);
    })
})
module.exports = users;