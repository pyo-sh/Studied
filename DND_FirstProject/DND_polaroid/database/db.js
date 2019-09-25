const Sequelize = require('sequelize');
const db = {}
const sequelize = new Sequelize('poloapp',
    'poloapp',
    'mypassword',
{
    host : "poloapp.c9klnt3lplec.ap-northeast-2.rds.amazonaws.com",
    dialect : 'mysql',
    operatorsAliases: false,

    pool : {
        max:5,
        min:0,
        acquire: 30000,
        idel : 10000
    }
}
    
)

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;