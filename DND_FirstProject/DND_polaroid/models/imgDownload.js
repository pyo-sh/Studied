const Sequelize = require('sequelize');
const db = require('../database/db');

const imgDownload = db.sequelize.define(
    'imgDownload',
    {
        imgID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        userID: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        filmQnty : {
            type: Sequelize.INTEGER
        },
        downDate: {
            type : Sequelize.DATE,
        }
    },
    {
        timestamps: false
    }
)

module.exports = imgDownload;