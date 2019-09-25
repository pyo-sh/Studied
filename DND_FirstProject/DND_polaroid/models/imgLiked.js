const Sequelize = require('sequelize');
const db = require('../database/db');

const imgLiked = db.sequelize.define(
    'imgLiked',
    {
        imgID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        userID: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        likeDate: {
            type : Sequelize.DATE,
        }
    },
    {
        timestamps: false
    }
)

module.exports = imgLiked;