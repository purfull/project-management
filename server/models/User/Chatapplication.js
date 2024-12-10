const {Sequelize,DataTypes}= require('sequelize');

const sequelize = require('../../db')
// const { combineTableNames } = require('sequelize/lib/utils');

module.exports = sequelize.define(
   'chatapplication', 
   {
    
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    From_staff_id:{
        type:DataTypes.INTEGER,
        unique:true

    },
    status:{
        type:DataTypes.STRING
    },
    To_admin_id :{
        type : DataTypes.INTEGER,
        unique:true
    },
    message:{
        type : DataTypes.STRING
    }

},{
    TableName  : 'chatMessage',
    timestamps :  true
}

)
