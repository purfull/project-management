const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../db');


module.exports = sequelize.define(
    'ClientUser',
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        company_name:{
            type:DataTypes.STRING,
            unquie:true
        },
        cp_name:{
            type:DataTypes.STRING,

        },
        user_name:{
            type:DataTypes.STRING
        },
        password:{
            type:DataTypes.INTEGER

        },
        cp_phone:{
            type:DataTypes.INTEGER

        },
        cp_email:{
            type:DataTypes.STRING

        },
        company_phone:{
            type:DataTypes.INTEGER

        },
        company_email:{
            type:DataTypes.STRING

        },
        company_logo:{
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
        tableName: 'ClientUser',
        timestamps: true
      }
)