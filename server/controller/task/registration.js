const Task = require('../../models/User/TaskMain');


// Route to create task with file upload
const router = require('express').Router();
const { createTask } = require('../../controller/task/registration');

// const upload = multer({ dest: 'files/' })

module.exports ={

        createTask :async(req, res)=>{

            const {
                id,
                assinged_by,
                assigned_to,
                status,
                subject,
                task_content,
                attachments


            } = req.body

            try{
                const newtask = await Task.create({
                    id,
                    assinged_by,
                    assigned_to,
                    status, 
                    subject,
                    task_content,
                    attachments
                });

                
            res.status(200).json({ data:newtask, message:"task created or assigned successfully"});


            }catch(error){
                    console.log(error+"err to creating task ");
                    res.status(500).json({message:"failed to create or asssigned task " , error:error.message})
                    
            }

        }
        



}

