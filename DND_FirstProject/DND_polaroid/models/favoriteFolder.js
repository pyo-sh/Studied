const Sequelize = require('sequelize');
const db = require('../database/db');
const favorite = require('./favorite');

const favoriteFolder = db.sequelize.define(
    'favoriteFolder',
    {
        favFolderNum: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        favFolderName : {
            type: Sequelize.STRING,
        },
    },
    {
        timestamps: false
    }
)

favoriteFolder.hasMany(favorite, {foreignKey : 'favFolderNum', sourceKey: 'favFolderNum' });
module.exports = favoriteFolder;