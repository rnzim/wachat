const connection = require('../database/database')
const Sequelize = require('sequelize')
const User = connection.define('users',{
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    username:{
        type: Sequelize.STRING,
        allowNull: false
    },
    pass:{
        type: Sequelize.STRING,
        allowNull: false
    }
    
})
User.sync({force: false})

module.exports = User