const Sequelize = require('sequelize');
const db = require('../database/db');

const filmUseList = db.sequelize.define(
    'filmUseList',
    {
        listID: {
            type: Sequelize.STRING,
            autoIncrement : true,
            primaryKey: true,
        },
        filmQnty : {
            type: Sequelize.INTEGER
        },
        useType : {
            type: Sequelize.STRING,
        },
        useDate : {
            type: Sequelize.DATE,
            defaultValue : Sequelize.NOW
        },
        userID : {
            type: Sequelize.STRING,
        },
    },
    {
        timestamps: false
    }
)
module.exports = filmUseList;