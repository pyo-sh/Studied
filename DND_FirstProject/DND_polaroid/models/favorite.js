const Sequelize = require('sequelize');
const db = require('../database/db');

const favorite = db.sequelize.define(
    'favorite',
    {
        favFolderNum: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        imgID : {
            type: Sequelize.INTEGER,
            primaryKey : true,
        }
    },
    {
        timestamps: false
    }
)

module.exports = favorite;