const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../db');


module.exports = sequelize.define(
    'performance', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    staff_id: {
        type: DataTypes.INTEGER,
        unique: true

    },
    task_assigned_time: {
        type: DataTypes.DATE

    },
    task_starting_time: {
        type: DataTypes.DATE
    },
    task_end_time: {
        type: DataTypes.DATE
    },
    deadline: {
        type: DataTypes.DATE
    },
}, {
    tableName: 'Performance',
    timeStamps: true,


})