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
            type:DataTypes.STRING,
            unique:true
          },
          admin_role:{
            type:DataTypes.STRING,
          },
           isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }


    },
    {
        tableName: 'AdminUser',
        timestamps: true
      }
)

