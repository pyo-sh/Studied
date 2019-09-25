const Sequelize = require('sequelize');
const db = require('../database/db');

const follow = db.sequelize.define(
    'follow',
    {
        followID: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        followerID : {
            type: Sequelize.STRING,
            primaryKey: true,
        },
    },
    {
        timestamps: false
    }
)
module.exports = follow;