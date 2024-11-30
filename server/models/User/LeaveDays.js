const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../../db')


module.exports = sequelize.define(
    'LeaveDays',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        staff_id: {
            type: DataTypes.INTEGER,
            unique: true
        },
        leave_type: {
            type: DataTypes.STRING
        },
        start_date: {
            type: DataTypes.DATE
        },
        end_date: {
            type: DataTypes.DATE
        },
        reason: {
            type: DataTypes.STRING
        },
    }, {
    tableName: "Leave",
    timeStamps: true
}



)