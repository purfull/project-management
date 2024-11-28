const { Sequelize, DataTypes  } = require('sequelize');
const sequelize = require('../../db');


module.exports = sequelize.define(
     'TaskMain',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        assinged_by: {
            type: DataTypes.INTEGER
        },
        assigned_to: {
            type: DataTypes.INTEGER

        },
        status: {
            type: DataTypes.STRING
        },
        remarks:{
            type:DataTypes.STRING
        },
        subject: {
            type: DataTypes.STRING
        },
        task_conetnt: {
            type: DataTypes.STRING
        },
        attachments: {
            type: DataTypes.JSON
        },


    }, {
    tableName: 'TaskMain',
    timestamps: true

}
);