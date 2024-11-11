const { Sequelize, DataTypes  } = require('sequelize');
const sequelize = require('../../db');


module.exports = sequelize.define(
   'AdminUser',
    {

        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
          user_name:{
            type :DataTypes.STRING,
            unique:true
          },
          password:{
            type:DataTypes.STRING,
          },
          email:{
            type:DataTypes.STRING,
            unique:true
          },
          phone_number:{
            type:DataTypes.INTEGER,
            unique:true
          },
          admin_role:{
            type:DataTypes.STRING,
          }


    },
    {
        tableName: 'AdminUser',
        timestamps: true
      }
)

