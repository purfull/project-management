const Task = require('../../models/User/TaskMain');


// Route to create task with file upload
const router = require('express').Router();

const { createTask } = require('../../controller/task/registration');

const { where } = require('sequelize');
const jwt = require('jsonwebtoken');



module.exports = {



    createTask: async (req, res) => {

        const {
            id,
            assinged_by,
            assigned_to,
            status,
            remarks,
            subject,
            task_content,
            attachments


        } = req.body

        try {
            const newtask = await Task.create({
                id,
                assinged_by,
                assigned_to,
                remarks,
                status,
                subject,
                task_content,
                attachments
            });


            res.status(200).json({ data: newtask, message: "task created or assigned successfully" });
            updatetask

        } catch (error) {
            console.log(error + "err to creating task ");
            res.status(500).json({ message: "failed to create or asssigned task ", error: error.message })

        }

    },


    updateTask: async (req, res) => {
        const { id, status, remarks } = req.body

        try {
            const updatetask = await Task.update({
                status,
                remarks

            }, {
                where: { id },

            })

            res.status(200).json({ data: updatetask, message: "Task updatee completed " })
        } catch (error) {
            console.log("err to update task" + error);
            res.status(500).json({ message: "failed to task update ", error: error.message })

        }
    }



}