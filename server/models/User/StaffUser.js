
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../db');

module.exports = sequelize.define(
   'StaffUser',
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
          user_role:{
            type:DataTypes.STRING,
          },
          
       staff_name:{
            type:DataTypes.STRING,
        },
        
        staff_phone:{
            type:DataTypes.INTEGER

        },
       staff_email:{
            type:DataTypes.STRING

        },
       profile_pic:{
            type:DataTypes.TEXT

        },
        address:{
            type: DataTypes.STRING,
        },
        city :{
            type:DataTypes.STRING,
          },
          state :{
              type:DataTypes.STRING,
          },
          postal_code:{
              type:DataTypes.INTEGER,  
          },
          country:{
              type:DataTypes.STRING,
          },
          isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
        


    },
    {
        tableName: 'StaffUser',
        timestamps: true
      }
)

