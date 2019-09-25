const Sequelize = require('sequelize');
const db = require('../database/db');
const favoriteFolder = require('./favoriteFolder');
const follow = require('./follow');
const image = require('./image');
const imgLiked = require('./imgLiked');
const imgDownload = require('./imgDownload');
const filmUseList = require('./filmUseList');

const User = db.sequelize.define(
    'user',
    {
        ID : {
            type : Sequelize.STRING,
            primaryKey : true,
        },
        PASSWORD: {
            type: Sequelize.STRING,
        },
        email : {
            type: Sequelize.STRING,
        },
        profileImg : {
            type : Sequelize.STRING
        },
        nickname : {
            type: Sequelize.STRING,   
        },
        introduce: {
            type: Sequelize.STRING,
        },
        follow : {
            type: Sequelize.INTEGER,
        },
        follower : {
            type: Sequelize.INTEGER,   
        },
        grade: {
            type : Sequelize.STRING
        },
        film : {
            type : Sequelize.INTEGER
        }
    },
    {
        timestamps: false
    }
)
User.hasMany(favoriteFolder, {foreignKey : 'ID', sourceKey: 'ID' });
User.hasMany(follow, {foreignKey : 'followID', sourceKey: 'ID'});
User.hasMany(follow, {foreignKey : 'followerID', sourceKey: 'ID'});
User.hasMany(image, { foreignKey: 'imgID', sourceKey: 'ID'});
User.hasMany(imgLiked, {foreignKey : 'userID', sourceKey: 'ID'});
User.hasMany(imgDownload, {foreignKey : 'userID', sourceKey : 'ID'});
User.hasMany(filmUseList, {foreignKey: 'userID', sourceKey: 'ID'});

module.exports = User;